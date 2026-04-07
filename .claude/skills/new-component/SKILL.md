---
description: Crée un composant React selon les conventions du projet (named export, TypeScript strict, Tailwind, props typées). Usage : /new-component <NomComposant> <chat|invoice>
---

Crée un nouveau composant React pour le projet Copilot Devis.

## Arguments
- `$0` : Nom du composant en PascalCase (ex: `InvoiceHeader`)
- `$1` : Colonne cible — `chat` (colonne gauche) ou `invoice` (colonne droite). Défaut : `chat`

## Ce que tu dois faire

1. Détermine le chemin de destination :
   - Si `$1` est `invoice` → `src/components/invoice/$0.tsx`
   - Sinon → `src/components/chat/$0.tsx`

2. Génère le fichier avec ce squelette **obligatoire** :
   ```tsx
   type Props = {
     // à compléter selon le contexte
   }

   export const $0 = ({}: Props) => {
     return (
       <div className="">
         {/* contenu */}
       </div>
     )
   }
   ```

3. Règles à respecter impérativement :
   - Export **nommé** uniquement (jamais `export default`)
   - Types des props **inline** avec `type Props = { ... }` dans le même fichier
   - **Tailwind uniquement** pour les styles, zéro CSS inline ou module
   - Pas de `any`, pas d'imports inutiles
   - Si le composant a besoin de state ou d'effets, les ajouter avec les bons hooks React

4. Après avoir créé le fichier, affiche un résumé :
   - Chemin du fichier créé
   - Props générées
   - Rappel : importer avec `import { $0 } from '@/components/...'`
