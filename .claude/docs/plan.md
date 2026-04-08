# Plan du Projet — Copilot Devis

## État d'avancement

| Phase | Statut | Description |
|---|---|---|
| Phase 0 | ✅ Terminé | Setup Claude Code (CLAUDE.md, rules, skills, settings, worktreeinclude) |
| Phase 1 | ✅ Terminé | Init Next.js 16 + dépendances IA |
| Phase 2 | ✅ Terminé | Schéma Zod + useReducer |
| Phase 3 | ✅ Terminé | Layout UI 50/50 (composants Chat + Invoice) |
| Phase 4 | ⏳ À faire | Routes API IA (Whisper STT + Gemini LLM) |
| Phase 5 | ⏳ À faire | Export PDF |

---

## Phase 0 — Claude Code Setup ✅

Fichiers créés :
- `.claude/CLAUDE.md` — conventions, stack, structure dossiers, commit rules
- `.claude/settings.json` — model: sonnet, hook tsc PostToolUse, deny permissions .env
- `.claude/rules/security.md` — clés API côté client interdites
- `.claude/rules/code-style.md` — exports nommés, Tailwind only, TS strict
- `.claude/rules/ai-integration.md` — patterns Vercel AI SDK (streamObject + useObject + Zod)
- `.claude/skills/new-component/` — crée un composant selon les conventions du projet
- `.claude/skills/audit-ai-security/` — audit sécurité (user-only)
- `.worktreeinclude` — copie .env dans les worktrees Claude

---

## Phase 1 — Init Next.js 16 ✅

- Framework : Next.js 16.2.2 (Turbopack activé par défaut)
- TypeScript strict, Tailwind CSS, ESLint, App Router, src/ dir
- Import alias `@/*` → `src/*`
- Dépendances IA : `ai`, `@ai-sdk/google`, `@ai-sdk/openai`, `zod`, `lucide-react`
- Structure créée :
  ```
  src/
  ├── app/
  │   ├── api/transcribe/        ← Phase 4
  │   ├── api/generate-invoice/  ← Phase 4
  │   ├── globals.css
  │   ├── layout.tsx
  │   └── page.tsx               ← squelette 50/50 en place
  ├── components/
  │   ├── chat/                  ← Phase 3
  │   └── invoice/               ← Phase 3
  ├── lib/                       ← Phase 2
  └── types/                     ← Phase 2
  ```
- `.env.local` gitignored — à remplir manuellement avec les clés API
- `AGENTS.md` généré par Next.js 16 — instructions pour agents IA (à garder)

---

## Phase 2 — Schéma Zod + useReducer ✅

Fichiers créés :
- `src/lib/schemas.ts` — `InvoiceItemSchema` + `InvoiceSchema` Zod, types inférés avec `z.infer`
- `src/lib/invoice-reducer.ts` — 8 actions (`SET_INVOICE`, `SET_CLIENT`, `ADD_ITEM`, `UPDATE_ITEM`, `REMOVE_ITEM`, `SET_NUMERO_DEVIS`, `SET_DATE`, `RESET`)
- `src/types/invoice.ts` — re-export des types depuis `@/lib/schemas` et `@/lib/invoice-reducer`

Décisions :
- Types inférés depuis Zod, pas réécrits manuellement (source de vérité unique)
- `SET_INVOICE` est l'action déclenchée par le stream `useObject` de Gemini

---

## Phase 3 — Layout UI ✅

Composants créés :
- `ChatColumn` — conteneur colonne gauche, gère messages + state input + scroll auto
- `MessageBubble` — bulle user (bleue, droite) / assistant (grise, gauche)
- `ChatInput` — textarea (Entrée = envoi), bouton micro animé, bouton send
- `InvoicePreview` — aperçu A4 avec totaux calculés dynamiquement
- `InvoiceItem` — ligne éditable WYSIWYG (clic direct sur chaque champ)

Décisions :
- `ChatColumn` et `InvoicePreview` ont chacun leur `useReducer` local pour l'instant
- En Phase 4 : state remonté dans `page.tsx` pour que le stream Gemini mette à jour l'aperçu en temps réel

---

## Phase 4 — Routes API IA ⏳

- `POST /api/transcribe` — reçoit un blob audio, retourne `{ data: { text }, error }`
- `POST /api/generate-invoice` — reçoit du texte, stream un objet `Invoice` via `streamObject`

---

## Phase 5 — Export PDF ⏳

Options envisagées : `@react-pdf/renderer` ou `html2canvas` + `jsPDF`

---

## Décisions Techniques Prises

| Décision | Raison |
|---|---|
| Next.js 16 (pas 15) | Version installée par create-next-app@latest |
| Turbopack activé | Par défaut dans Next.js 16, plus rapide |
| MCP GitHub pour les pushs | Apprentissage des outils MCP |
| Conventional Commits | Convention standard, définie dans CLAUDE.md |
| `push_files` MCP > `create_or_update_file` | Regroupe plusieurs fichiers en un commit |
