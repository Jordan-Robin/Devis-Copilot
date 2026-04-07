# VoiceQuote — Copilot Devis

Application SPA de génération de devis par la voix ou le texte, sans auth ni BDD.
Cible : auto-entrepreneurs et prestataires de services.

> Specs fonctionnelles : `@docs/ai-specs.md` | Plan & avancement : `@docs/plan.md`

---

## Commandes

```bash
npm run dev        # Serveur de développement (http://localhost:3000)
npm run build      # Build de production
npm run lint       # ESLint
npx tsc --noEmit   # Vérification TypeScript sans compilation
```

---

## Stack Technique

| Rôle | Outil |
|---|---|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript (mode strict) |
| UI | Tailwind CSS + Lucide React |
| State | React `useReducer` |
| IA Orchestration | Vercel AI SDK (`ai` + `@ai-sdk/google` + `@ai-sdk/openai`) |
| STT | OpenAI Whisper (`whisper-1`) |
| LLM | Google Gemini 1.5 Flash |
| Validation | Zod |

---

## Structure des Dossiers

```
src/
├── app/
│   ├── api/
│   │   ├── transcribe/route.ts     # POST : audio → texte (Whisper)
│   │   └── generate-invoice/route.ts # POST : texte → Invoice JSON (Gemini)
│   ├── layout.tsx
│   └── page.tsx                    # Layout 50/50
├── components/
│   ├── chat/                       # Colonne gauche : messages + input + micro
│   └── invoice/                    # Colonne droite : aperçu A4 + PDF
├── lib/
│   ├── schemas.ts                  # Zod InvoiceSchema + types inférés
│   └── invoice-reducer.ts          # useReducer actions/reducer
└── types/
    └── invoice.ts                  # Types TS exportés
```

---

## Règles de Code

- **Exports** : toujours nommés (`export const Foo`, jamais `export default`)
- **Styles** : Tailwind uniquement, zéro CSS modules
- **Hooks IA** : utiliser `useObject` du Vercel AI SDK pour le streaming JSON
- **Sécurité** : aucune clé API dans les composants client — tout passe par `/api`
- **API Routes** : chaque route doit retourner `{ data, error }` — jamais de throw nu
- **Layout** : respecter le split 50/50 vertical décrit dans `@docs/ai-specs.md`
- **Validation** : toutes les réponses IA doivent être parsées via Zod avant usage

---

## Schéma Invoice (référence rapide)

```typescript
// Détail complet dans src/lib/schemas.ts
InvoiceSchema = z.object({
  client: { nom, adresse },
  items: [{ description, quantite, prix_ht, tva_taux }],
  numero_devis,
  date,
})
```

---

## Messages de Commit (Conventional Commits)

Format : `<type>(scope): <description en anglais, impératif>`

```
feat(invoice): add Zod schema and inferred types
fix(api): return error object when Whisper call fails
chore(deps): install ai and @ai-sdk/google
refactor(chat): extract MessageBubble into separate component
docs(claude): update CLAUDE.md with commit conventions
```

Types : `feat` | `fix` | `chore` | `refactor` | `docs` | `style` | `test`

---

## Patterns à Suivre

### Route API IA
```typescript
// Toujours ce format de réponse
return NextResponse.json({ data: result, error: null })
// ou
return NextResponse.json({ data: null, error: "message" }, { status: 500 })
```

### Appel Gemini via AI SDK
```typescript
// Utiliser streamObject pour le streaming structuré
import { streamObject } from 'ai'
import { google } from '@ai-sdk/google'
```
