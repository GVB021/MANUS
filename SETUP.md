# Plataforma de Curso de Dublagem - Setup

## Arquitetura

A plataforma é composta por **dois apps independentes**:

| App | Porta | Função |
|-----|-------|--------|
| **Curso-Dublagem** | 3000 | Landing page + divulgação + redirecionamento |
| **UltimoHub** | 3001 | Studio completo (login, dashboard, room de gravação) |

## Setup Local

### 1. Curso-Dublagem (Porta 3000)

```bash
cd /home/ubuntu/dublagem-mvp
npm install
npm run dev
```

Acessa em: `http://localhost:3000`

### 2. UltimoHub (Porta 3001)

```bash
cd /home/ubuntu/ultimohub/ultimohub
npm install
PORT=3001 npm run dev
```

Acessa em: `http://localhost:3001`

## Fluxo de Usuário

1. **Usuário acessa:** `http://localhost:3000` (Landing page)
2. **Clica em "Login" ou "Cadastro"** → Redireciona para `http://localhost:3001`
3. **Faz login/cadastro no UltimoHub**
4. **Acessa o Studio** (dashboard, room de gravação, etc)

## Banco de Dados

Ambos os apps compartilham o **mesmo banco de dados Supabase (PostgreSQL)**:

- **Curso-Dublagem:** Usa schema básico (users, modules, students, takes, etc)
- **UltimoHub:** Usa schema completo (studios, studioMemberships, recordings, etc)

### Configurar Supabase

1. Criar projeto no [Supabase](https://supabase.com)
2. Copiar `DATABASE_URL` 
3. Adicionar ao `.env` de ambos os apps:

```bash
# .env
DATABASE_URL=postgresql://user:password@host:5432/database
```

## Funcionalidades

### Curso-Dublagem (Landing Page)
- ✅ Hero section com carrossel de banners
- ✅ Seções de módulos (Iniciante, Intermediário, Avançado)
- ✅ Seção de professores
- ✅ Seção de aprendizados
- ✅ Redirecionamento para UltimoHub

### UltimoHub (Studio)
- ✅ Autenticação (login/cadastro)
- ✅ Dashboard do studio
- ✅ Room de gravação (Web Audio API)
- ✅ Gerenciamento de takes
- ✅ Painel do aluno

## Variáveis de Ambiente

### Curso-Dublagem

```bash
# .env
DATABASE_URL=postgresql://...
VITE_APP_TITLE=Escola de Dublagem
```

### UltimoHub

```bash
# .env
PORT=3001
DATABASE_URL=postgresql://...
```

## Troubleshooting

### "Connection refused" ao conectar no banco
- Verificar se `DATABASE_URL` está correto
- Verificar se Supabase está rodando
- Verificar SSL (pode precisar de `?sslmode=require`)

### Porta 3001 já em uso
```bash
# Encontrar processo na porta 3001
lsof -i :3001

# Matar processo
kill -9 <PID>
```

### Erro de permissão ao instalar
```bash
# Corrigir permissões
sudo chown -R $USER:$USER /home/ubuntu/ultimohub/ultimohub
npm install
```

## Próximos Passos

- [ ] Integrar Supabase compartilhado
- [ ] Testar fluxo completo de login
- [ ] Implementar notificações para diretores
- [ ] Adicionar sistema de pagamento (futuro)
- [ ] Deploy em produção

## Contato

Para dúvidas ou problemas, consulte a documentação do UltimoHub em `/home/ubuntu/ultimohub/ultimohub/README.md`
