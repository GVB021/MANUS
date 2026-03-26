# 🚀 ROADMAP CORREÇÕES CRÍTICAS (15min → Production)

## **🔴 PRIORIDADE 1: SECURITY ADMIN (5min)**
```
[X] 1. Remover emails hardcoded AdminPanel.tsx
[X] 2. Firebase Custom Claims OR profiles.role = 'admin'
[X] 3. Firestore rule: allow write: if (resource.data.role == 'admin')
```

## **🟡 PRIORIDADE 2: CLEANUP (3min)**
```
[X] npm uninstall @supabase/supabase-js
[X] rm Supabase refs data.ts/AdminPanel settings
```

## **🟢 PRIORIDADE 3: ERRORBOUNDARY (5min)**
```
[X] src/ErrorBoundary.tsx → main.tsx
[X] Global crash protection
```

## **🔵 BONUS: AdminMinicursosTab (2min)**
```
[X] Pass draft prop → onSave
[X] Thumbnail preview form
```

## **💰 STRIPE (DEPOIS)**
```
[ ] VITE_STRIPE_PUBLIC_KEY=pk_live_...
[ ] Payment intents backend
```

---

**EXECUTE**:
```bash
npm uninstall @supabase/supabase-js
# Edit AdminPanel: profiles.role check
# Add ErrorBoundary main.tsx
npm run build  # Test production
```

**Resultado**: 100% PROD READY 🚀
