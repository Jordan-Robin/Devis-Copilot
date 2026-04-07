---
name: Mise à jour du plan de projet
description: Mettre à jour plan.md avant chaque commit de fin de phase ou d'étape significative
type: feedback
---

Avant tout commit qui termine une phase ou une étape significative, mettre à jour `.claude/docs/plan.md` :
- Passer le statut de `⏳ À faire` à `✅ Terminé`
- Ajouter les décisions techniques importantes prises pendant la phase
- Inclure ce fichier dans le commit concerné

**Why:** `plan.md` est le seul endroit versionné qui indique où en est le projet. C'est ce que Claude lit en début de nouvelle conversation pour savoir quoi faire ensuite.

**How to apply:** Systématiquement, avant `git commit` sur une phase terminée.
