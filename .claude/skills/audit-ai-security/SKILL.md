---
description: Vérifie que aucune clé API ni appel IA ne se trouve dans des composants client. Audit de sécurité à lancer avant chaque commit.
disable-model-invocation: true
---

Lance un audit de sécurité IA sur le projet Copilot Devis.

## Ce que tu dois vérifier

### 1. Clés API dans les composants client
Recherche dans `src/` les fichiers contenant `"use client"` ET l'une de ces chaînes :
- `OPENAI_API_KEY`
- `GOOGLE_GENERATIVE_AI_API_KEY`
- `GITHUB_PAT`
- `process.env` (toute référence à une variable d'env)

Si trouvé → **ERREUR** : afficher le fichier et la ligne concernée.

### 2. Appels IA hors routes API
Recherche dans `src/` les imports de `ai`, `@ai-sdk/google`, `@ai-sdk/openai` dans des fichiers qui NE sont PAS dans `src/app/api/`.

Si trouvé → **AVERTISSEMENT** : ces imports sont suspects hors d'une route API.

### 3. Vérification du format de réponse API
Recherche dans `src/app/api/**/*.ts` les `return NextResponse.json(` qui ne contiennent pas la clé `error`.

Si trouvé → **AVERTISSEMENT** : la route ne respecte pas le format `{ data, error }`.

## Format du rapport

```
=== Audit Sécurité IA ===

✅ / ❌  Clés API : <résultat>
✅ / ⚠️  Imports IA : <résultat>
✅ / ⚠️  Format API routes : <résultat>

<détail des problèmes trouvés le cas échéant>
```

Termine toujours par une ligne de synthèse indiquant si le projet est prêt (`PASS`) ou non (`FAIL`).
