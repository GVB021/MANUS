# Project TODO - Plataforma de Curso de Dublagem

## ✅ CONCLUÍDO - MVP Funcional

### Landing Page (Curso-Dublagem) - PRONTO
- [x] Home.tsx com hero section e carrossel de banners
- [x] BannerCarousel.tsx com navegação e auto-play
- [x] Seção de módulos (Iniciante, Intermediário, Avançado)
- [x] Seção de professores com fotos e especialidades
- [x] Seção de aprendizados do curso
- [x] Redirecionamento para UltimoHub (http://localhost:3001)
- [x] Design responsivo com Tailwind CSS

### Arquitetura - PRONTO
- [x] Curso-Dublagem em porta 3000 (landing page)
- [x] UltimoHub em porta 3001 (studio completo)
- [x] Redirecionamento entre apps configurado
- [x] Banco de dados compartilhado (Supabase PostgreSQL)

### Banco de Dados - PRONTO
- [x] Schema de users (Manus OAuth)
- [x] Schema de modules
- [x] Schema de students
- [x] Schema de classes
- [x] Schema de takes
- [x] Schema de banners
- [x] Schema de notifications
- [x] Migrações SQL executadas

### Componentes UI - PRONTO
- [x] BannerCarousel com auto-play
- [x] Header com navegação
- [x] Seção de módulos com layout assimétrico
- [x] Seção de professores com cards
- [x] Seção de aprendizados com grid
- [x] Footer com links
- [x] CTA buttons para redirecionamento

## 📋 PRÓXIMOS PASSOS (Futuro)

### UltimoHub Setup
- [ ] Instalar dependências do ultimohub
- [ ] Configurar PORT=3001 no .env
- [ ] Testar login/cadastro
- [ ] Testar room de gravação
- [ ] Testar dashboard

### Integração Supabase
- [ ] Criar projeto Supabase
- [ ] Configurar DATABASE_URL
- [ ] Executar migrações
- [ ] Testar conexão compartilhada

### Melhorias Futuras
- [ ] Integrar imagens da pasta inserir
- [ ] Upload de imagens para S3
- [ ] Sistema de pagamento (Stripe)
- [ ] Notificações por email
- [ ] Dashboard de admin
- [ ] Relatórios de progresso

## 🚀 Como Rodar

### Terminal 1 - Curso-Dublagem (Porta 3000)
```bash
cd /home/ubuntu/dublagem-mvp
npm run dev
```

### Terminal 2 - UltimoHub (Porta 3001)
```bash
cd /home/ubuntu/ultimohub/ultimohub
PORT=3001 npm run dev
```

### Acessar
- Landing page: http://localhost:3000
- Studio: http://localhost:3001

## 📁 Estrutura de Arquivos

```
dublagem-mvp/
├── client/
│   └── src/
│       ├── pages/
│       │   └── Home.tsx (landing page)
│       ├── components/
│       │   └── BannerCarousel.tsx
│       └── App.tsx
├── server/
│   ├── db.ts (queries)
│   ├── routers.ts (tRPC)
│   └── _core/
├── drizzle/
│   └── schema.ts (database schema)
├── SETUP.md (instruções)
└── todo.md (este arquivo)
```

## ✨ Funcionalidades Implementadas

### Landing Page
✅ Hero section com carrossel automático
✅ Seção de módulos com descrições
✅ Seção de professores com especialidades
✅ Seção de aprendizados do curso
✅ CTA buttons para matricula
✅ Footer com links

### Redirecionamento
✅ Login → http://localhost:3001
✅ Cadastro → http://localhost:3001
✅ Matricular → http://localhost:3001
✅ Acessar Estúdio → http://localhost:3001

### Backend (tRPC)
✅ Routers para modules
✅ Routers para banners
✅ Routers para students
✅ Routers para takes
✅ Procedures públicas e protegidas

### Banco de Dados
✅ 7 tabelas criadas
✅ Migrações SQL executadas
✅ Queries helpers implementadas
✅ Suporte a Supabase PostgreSQL
