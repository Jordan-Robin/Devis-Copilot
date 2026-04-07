# PRD : Application "Copilot Devis" - Générateur de Devis Intelligent

## 1. Vision du Produit
**Objectif :** Créer une interface Single Page (SPA) permettant de générer un devis professionnel instantanément par la voix ou le texte, sans friction (pas d'auth, pas de BDD).
* **Cible :** Auto-entrepreneurs et prestataires de services.

---

## 2. Architecture Technique (Stack 2026)
* **Framework :** Next.js 15+ (App Router)
* **Langage :** TypeScript (Mode strict)
* **UI :** Tailwind CSS + Lucide React (Icônes)
* **Orchestration IA :** Vercel AI SDK (`ai` core + `@ai-sdk/google` + `@ai-sdk/openai`)
* **Modèles :**
    * **STT (Speech-to-Text) :** OpenAI Whisper API (`whisper-1`)
    * **LLM (Extraction JSON) :** Google Gemini 1.5 Flash (via Google AI Studio)
* **Validation de Données :** Zod (pour le schéma de l'objet Invoice)

---

## 3. Spécifications Fonctionnelles

### A. Interface Utilisateur (Layout)
L'écran est divisé verticalement en deux colonnes :
1. **Colonne Gauche (Interaction) :**
    * Historique des messages (bulles de chat).
    * Bouton "Micro" pour l'enregistrement audio.
    * Zone de saisie de texte classique.
2. **Colonne Droite (Aperçu Devis) :**
    * Rendu en temps réel d'un devis A4 professionnel.
    * Champs éditables au clic (nom du client, prix, quantités).
    * Bouton "Générer PDF" en haut de l'aperçu.

### B. Gestion des Données (Schéma Zod)
L'objet `Invoice` doit respecter la structure suivante pour garantir la cohérence de l'UI :
```typescript
const InvoiceSchema = z.object({
  client: z.object({
    nom: z.string().default(""),
    adresse: z.string().default(""),
  }),
  items: z.array(z.object({
    description: z.string(),
    quantite: z.number().min(1).default(1),
    prix_ht: z.number(),
    tva_taux: z.number().default(20),
  })).default([]),
  numero_devis: z.string().default("DEV-2026-001"),
  date: z.string().default(new Date().toLocaleDateString()),
});