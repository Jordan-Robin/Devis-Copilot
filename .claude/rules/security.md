---
name: Sécurité API & secrets
description: Règles de sécurité pour ne jamais exposer les clés API côté client et protéger les secrets
type: feedback
---

Ne jamais lire, afficher, citer ou suggérer d'importer le contenu des fichiers `.env`, `.env.local` ou tout fichier de secrets.

Toujours vérifier qu'un appel IA ou une clé API se trouve dans un fichier `app/api/**` (Server-side). Si on détecte un `import` de clé API dans un composant client (`use client`), signaler immédiatement.

**Why:** Les clés API exposées côté client sont visibles dans le bundle JS envoyé au navigateur. Tout utilisateur peut les extraire et les utiliser frauduleusement.

**How to apply:** Avant toute suggestion de code impliquant `OPENAI_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY` ou tout autre secret, vérifier que le fichier cible est une Route Handler Next.js (`route.ts` dans `app/api/`).
