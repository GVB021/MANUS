# Arquitetura - Plataforma de Curso de Dublagem

## Fluxo de Usuários

### 1. Visitante (Não autenticado)
- Acessa landing page com divulgação do curso
- Vê carrossel de banners, módulos, professores
- Clica em "Matricule-se" → formulário de cadastro
- Recebe email com link de confirmação

### 2. Aluno Cadastrado (Email/Senha)
- Faz login com email e senha
- Acessa painel do aluno
- Acessa estúdio de gravação para suas aulas
- Grava áudio, faz upload de takes
- Vê histórico de gravações

### 3. Diretor/Admin
- Faz login com credenciais admin
- Acessa dashboard de gerenciamento
- Vê notificações quando alunos completam gravações
- Gerencia alunos, aulas, módulos

## Estrutura de Banco de Dados

### Tabelas Principais

**users** (herdado do template)
- id, openId, name, email, loginMethod, role, createdAt, updatedAt, lastSignedIn

**students** (novo)
- id, userId, firstName, lastName, phone, city, state, bio, experience, specialty, mainLanguage, portfolioUrl
- moduleId (FK), enrollmentDate, status (active, inactive, completed)

**modules** (novo)
- id, slug, title, teacher, duration, description, imageUrl, level (iniciante, intermediario, avancado)

**classes** (novo)
- id, moduleId, title, description, videoUrl, materials, order

**takes** (novo)
- id, studentId, classId, characterName, audioUrl, duration, quality_score, status (draft, submitted, approved)
- createdAt, updatedAt, uploadedAt

**banners** (novo)
- id, title, description, imageUrl, linkUrl, isPromo, order, createdAt

**notifications** (novo)
- id, userId, type (take_completed, enrollment_confirmed), relatedId, isRead, createdAt

## Fluxo de Autenticação

### Opção 1: Manus OAuth (Padrão do template)
- Usuários fazem login via Manus OAuth
- Automático para admins
- Simples para usuários

### Opção 2: Email/Senha (Necessário para alunos)
- Cadastro com email e senha
- Hash de senha com bcrypt
- Sessão com JWT

**Decisão:** Usar ambos
- Landing page: Manus OAuth + formulário de cadastro (email/senha)
- Estúdio: Email/senha para alunos, Manus OAuth para admins

## Fluxo de Gravação

1. Aluno entra no estúdio
2. Vê script/personagem para gravar
3. Grava áudio com controles profissionais
4. Visualiza qualidade da gravação
5. Faz upload para S3
6. Toma é salvo no banco com URL pública
7. Diretor recebe notificação
8. Diretor pode revisar e aprovar

## Armazenamento de Arquivos

- **Imagens:** S3 (banners, fotos de professores, módulos)
- **Áudio:** S3 com URLs públicas para reprodução e download
- **Metadados:** Banco de dados (caminhos, informações do arquivo)

## Stack Tecnológico

- **Frontend:** React 19 + Tailwind 4 + Wouter
- **Backend:** Express 4 + tRPC 11
- **Banco:** MySQL (via Drizzle ORM)
- **Armazenamento:** S3 (via manus-upload-file)
- **Áudio:** Web Audio API + WAV encoding
- **Notificações:** Sistema built-in do Manus

## Componentes Principais

### Frontend
- `Home.tsx` - Landing page com carrossel e módulos
- `Signup.tsx` - Formulário de cadastro
- `Login.tsx` - Login com email/senha
- `StudentDashboard.tsx` - Painel do aluno
- `RecordingStudio.tsx` - Estúdio de gravação
- `TakesManager.tsx` - Gerenciamento de takes
- `AdminDashboard.tsx` - Dashboard admin

### Backend
- `routers/auth.ts` - Autenticação (login, signup, logout)
- `routers/students.ts` - Gerenciamento de alunos
- `routers/takes.ts` - Gerenciamento de takes
- `routers/modules.ts` - Módulos e aulas
- `routers/notifications.ts` - Notificações

## Prioridades MVP

1. ✅ Landing page com divulgação
2. ✅ Cadastro de interessados
3. ✅ Autenticação email/senha
4. ✅ Estúdio de gravação básico
5. ✅ Upload de áudio para S3
6. ✅ Painel do aluno
7. ✅ Notificações para diretores
8. Futuro: Sistema de pagamento (Stripe)
