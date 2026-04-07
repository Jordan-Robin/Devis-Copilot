---
name: Conventions de code
description: Règles de style et conventions pour ce projet Next.js 15 TypeScript
type: feedback
---

## Exports
Toujours utiliser des exports nommés. Jamais de `export default` sauf pour les `page.tsx` et `layout.tsx` qui l'exigent par convention Next.js.

## Styles
Tailwind CSS uniquement. Ne jamais créer de fichiers `.module.css` ou de blocs `<style>`.

## TypeScript
- Mode strict activé : pas de `any`, pas de `as unknown`
- Toujours inférer les types depuis Zod avec `z.infer<typeof Schema>` plutôt que de redéfinir manuellement
- Préférer `type` à `interface` sauf pour les objets extensibles

## Composants
- Un composant par fichier
- Nommage PascalCase pour les fichiers de composants
- Props typées inline avec `type Props = { ... }`

## API Routes (Next.js 15)
- Format de réponse obligatoire : `{ data: T | null, error: string | null }`
- Toujours gérer les erreurs avec try/catch et retourner `{ data: null, error: message }`
- Ne jamais laisser une route lancer une exception non catchée

**Why:** Cohérence du codebase pour faciliter la relecture et éviter les bugs de typage silencieux.

**How to apply:** Appliquer systématiquement à tout nouveau fichier créé dans le projet.
