# 🔧 Correções de Conectividade - HUB DUB

## Resumo das Mudanças

Este commit corrige 5 problemas críticos que causavam erro 404 no login e desconexão do banco de dados:

### 1. ✅ Dockerfile - Iniciar Servidor Principal
- **Antes:** `CMD ["node", "--input-type=module", "-e", "import('./dist/studio-index.js')"]`
- **Depois:** `CMD ["node", "--input-type=module", "-e", "import('./dist/index.js')"]`
- **Impacto:** Rotas de autenticação funcionarão

### 2. ✅ drizzle.config.ts - Trocar para PostgreSQL
- **Antes:** `dialect: "mysql"`
- **Depois:** `dialect: "postgresql"`
- **Impacto:** Migrações funcionarão com Supabase

### 3. ✅ server/db.ts - Trocar Driver
- **Antes:** `import { drizzle } from "drizzle-orm/mysql2"`
- **Depois:** `import { drizzle } from "drizzle-orm/node-postgres"`
- **Também:** Trocar `onDuplicateKeyUpdate` para `onConflictDoUpdate`
- **Impacto:** Conexão com banco funcionará

### 4. ✅ .env - Adicionar Variáveis Faltando
```bash
NODE_ENV=production
JWT_SECRET=supersecretkey1234567890
VITE_APP_ID=hub-dub-app-2026
OAUTH_SERVER_URL=
OWNER_OPEN_ID=
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
```
- **Impacto:** Servidor principal iniciará sem erros

### 5. ✅ server/_core/index.ts - Integrar Rotas do Estúdio
- Adicionar imports do servidor do estúdio
- Registrar rotas de autenticação e estúdio
- Configurar WebSocket para realtime
- **Impacto:** Rotas `/api/auth/*` funcionarão

## Como Testar

```bash
# Instalar dependências
pnpm install pg

# Build
pnpm build

# Start
npm start

# Testar login
curl -X POST http://localhost:5002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}'
# Esperado: 200 ou 401 (não 404)

# Testar frontend
curl http://localhost:5002/hub-dub/
# Esperado: HTML (não 404)
```

## Próximos Passos

1. Deploy em Railway
2. Testar login em produção
3. Testar gravação de áudio
4. Validar salvamento em Supabase

