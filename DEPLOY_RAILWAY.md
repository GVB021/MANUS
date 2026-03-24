# 🚀 Guia de Deploy no Railway - Dublagem MVP

Este guia detalha os passos necessários para hospedar o monorepo de dublagem no **Railway**, garantindo que o servidor, o cliente e o estúdio funcionem corretamente em produção.

## 📦 Estrutura do Projeto
O projeto é um monorepo que utiliza **pnpm** e está organizado da seguinte forma:
- `client/`: Frontend principal.
- `studio/`: Painel de estúdio e administração.
- `server/`: Servidor backend (Express + tRPC).
- `shared/`: Código compartilhado entre as partes.

## 🛠️ Configurações Realizadas
Para possibilitar o deploy, realizei as seguintes alterações:
1.  **`railway.json`**: Configurado para usar o builder **Nixpacks** com suporte a Node.js e Python.
2.  **`Dockerfile`**: Criado para garantir um build isolado e otimizado, caso prefira usar Docker.
3.  **`package.json`**: Adicionados scripts de orquestração (`studio:build`, `studio:start`) para gerenciar as subpastas.
4.  **`.env.example`**: Criado com todas as variáveis necessárias para o funcionamento do app.

## 🚀 Passo a Passo do Deploy

### 1. Preparar o Repositório
Certifique-se de que todos os arquivos (`railway.json`, `Dockerfile`, `package.json` atualizado) estão no seu repositório Git.

### 2. Criar Projeto no Railway
1. Acesse o [Railway](https://railway.app/).
2. Clique em **"New Project"** -> **"Deploy from GitHub repo"**.
3. Selecione o repositório `dublagem-mvp`.

### 3. Configurar Variáveis de Ambiente
No painel do Railway, vá em **Variables** e adicione as seguintes (use os valores do seu ambiente):

| Variável | Descrição |
| :--- | :--- |
| `DATABASE_URL` | URL de conexão do Supabase (PostgreSQL) |
| `SESSION_SECRET` | Chave aleatória para sessões |
| `SUPABASE_URL` | URL do seu projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço do Supabase |
| `DAILY_API_KEY` | Chave de API do Daily.co para as salas de áudio |
| `PORT` | Defina como `5002` |
| `NODE_ENV` | Defina como `production` |

### 4. Build e Deploy
O Railway detectará automaticamente o `railway.json` ou o `Dockerfile`. O comando de build executará `pnpm install` e `pnpm build`, e o comando de start iniciará o servidor principal.

## 🔍 Verificação de Saúde
Após o deploy, você pode verificar se o app está online acessando:
`https://seu-app.railway.app/health`

---
**Nota:** O banco de dados Supabase já está configurado com SSL dinâmico no código, então a conexão deve ser estável e segura automaticamente.
