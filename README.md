# 🎤 Copilot Devis

**Transformez une dictée vocale en devis professionnel en quelques secondes.**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![OpenAI](https://img.shields.io/badge/OpenAI-Whisper%20%2B%20GPT--4o--mini-412991?style=flat-square&logo=openai)
![Zod](https://img.shields.io/badge/Zod-validation-3068B7?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)

> 💡 **Inspiration** : Ce projet est une réplication pédagogique librement inspirée du travail de [Shubham Sharma](https://devis.shubham-sharma.com/). Merci à lui pour l'idée originale.

---

## 📹 Démo

<video src="https://github.com/user-attachments/assets/06b9026a-c3de-41b2-b9c0-ee5b6ddd7ac6" autoplay muted loop playsinline width="100%"></video>

---

## ✨ Fonctionnalités

- 🎙️ **Dictée vocale** — Enregistrement audio directement dans le navigateur, transcription via OpenAI Whisper
- 🤖 **Extraction intelligente** — GPT-4o Mini analyse le texte et structure automatiquement les prestations, le client, les prix et la TVA
- ⚡ **Aperçu en temps réel** — Le devis se construit progressivement grâce au streaming JSON (`useObject` du Vercel AI SDK)
- ✏️ **Édition WYSIWYG** — Chaque champ du devis est éditable directement dans l'aperçu
- 🏢 **Profil entreprise** — Renseignez vos infos une fois (SIREN, TVA, coordonnées), elles apparaissent dans tous vos devis
- 📄 **Export PDF** — Génération d'un PDF vectoriel propre côté navigateur avec `@react-pdf/renderer`
- 🔒 **Zéro compte, zéro base de données** — Aucune inscription requise, les données restent dans votre navigateur

---

## 🏗️ Architecture

Ce projet est développé avec une approche **IA-first** : l'ensemble du contexte technique est codifié dans des fichiers lisibles par les agents.

| Fichier | Rôle |
|---|---|
| `.claude/CLAUDE.md` | Conventions de code, stack, structure des dossiers, règles de commit — le "cerveau" de l'agent |
| `.claude/rules/` | Règles spécialisées : sécurité, style, intégration IA, mise à jour du plan |
| `docs/specifications.md` | Spécifications fonctionnelles et techniques du produit |
| `.claude/docs/plan.md` | Avancement phase par phase, décisions techniques prises |

Ce setup permet à un agent comme Claude Code de reprendre le développement n'importe quand avec un contexte complet.

---

## 🔄 Flux de traitement

```
Voix utilisateur
      ↓
MediaRecorder (navigateur)
      ↓
POST /api/transcribe → OpenAI Whisper → texte
      ↓
POST /api/generate-invoice → GPT-4o Mini (streamObject)
      ↓
useObject (Vercel AI SDK) → rendu progressif du devis
      ↓
Validation Zod → InvoicePreview + Export PDF
```

---

## 🛠️ Stack technique

| Rôle | Outil |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Langage | TypeScript (mode strict) |
| UI | Tailwind CSS + Lucide React |
| STT | OpenAI Whisper (`whisper-1`) via `@ai-sdk/openai` |
| LLM | OpenAI GPT-4o Mini via Vercel AI SDK |
| Streaming | `streamObject` (serveur) + `useObject` (client) |
| Validation | Zod |
| Export PDF | `@react-pdf/renderer` |
| State | React `useReducer` |

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- Une clé API [OpenAI](https://platform.openai.com/)

### Installation

```bash
git clone https://github.com/Jordan-Robin/Devis-Copilot.git
cd Devis-Copilot
npm install
```

### Configuration

Créez un fichier `.env.local` à la racine :

```env
OPENAI_API_KEY=sk-...
```

### Lancement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) et commencez à dicter votre première prestation.

---

## 🔐 Sécurité

> ⚠️ **Ne committez jamais votre fichier `.env.local`.**

Les clés API sont exclusivement utilisées côté serveur dans les routes `app/api/`. Elles ne sont jamais exposées dans le bundle JavaScript envoyé au navigateur.

Le fichier `.env.local` est listé dans `.gitignore` par défaut — vérifiez-le avant tout `git push`.

---

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/
│   │   ├── transcribe/route.ts       # Audio → texte (Whisper)
│   │   └── generate-invoice/route.ts # Texte → Invoice JSON streamé (GPT-4o Mini)
│   ├── layout.tsx
│   └── page.tsx                      # Layout 50/50, state partagé
├── components/
│   ├── chat/                         # Colonne gauche : chat, micro, modale entreprise
│   └── invoice/                      # Colonne droite : aperçu A4, export PDF
├── lib/
│   ├── schemas.ts                    # Schéma Zod Invoice
│   └── invoice-reducer.ts            # useReducer actions
└── types/
    └── invoice.ts                    # Re-exports des types
```

---

## 📝 Licence

MIT
