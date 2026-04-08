---
name: Intégration IA — Vercel AI SDK
description: Patterns obligatoires pour les appels IA avec le Vercel AI SDK dans ce projet
type: feedback
---

## Pattern Streaming Structuré
Utiliser `streamObject` (pas `generateObject`) pour les réponses IA vers le client, couplé au hook `useObject` côté composant. Cela permet un rendu progressif du devis pendant que Gemini génère.

## Validation Zod obligatoire
Toute réponse du LLM doit passer par `InvoiceSchema.parse()` ou `InvoiceSchema.safeParse()` avant d'être utilisée. Ne jamais faire confiance au JSON brut du modèle.

## Prompt Système
Le prompt système pour Gemini doit toujours :
1. Décrire le format JSON attendu (référencer le schéma Zod)
2. Préciser la langue (français)
3. Interdire tout texte hors JSON dans la réponse

## Modèles utilisés
- STT : `openai('whisper-1')` via `@ai-sdk/openai`
- LLM : `openai('gpt-4o-mini')` via `@ai-sdk/openai`

**Why:** Le Vercel AI SDK a des patterns spécifiques pour le streaming structuré. Suivre ces patterns évite les bugs de désérialisation et garantit une UX fluide.

**How to apply:** Avant tout appel IA, vérifier que `streamObject` + `useObject` sont utilisés et que la réponse est validée par Zod.
