# Spécifications Fonctionnelles et Techniques : Copilot Devis

Ce document détaille la conception de l'application Copilot Devis, un générateur de devis intelligent piloté par l'IA.

---

## 1. Objectifs et Vision du Produit
L'objectif est de supprimer la friction administrative pour les indépendants en permettant la création de devis via une interface conversationnelle naturelle. 
* **Saisie hybride :** Voix (prioritaire) ou Texte.
* **Zéro configuration :** Utilisation immédiate sans création de compte.
* **Intégrité :** Garantie de produire des données structurées valides malgré la flexibilité de l'IA.

## 2. Parcours Utilisateur (Workflow)
L'application repose sur un cycle de traitement en quatre étapes :
1. **Capture Audio** : L'utilisateur dicte ses besoins (ex: "Facture 500€ à Mr Martin pour du conseil").
2. **Transcription (STT)** : L'audio est converti en texte via l'API OpenAI Whisper.
3. **Extraction Sémantique** : Le texte est analysé par Google Gemini pour en extraire les entités (Client, Articles, Prix, TVA).
4. **Synchronisation d'Interface** : Le document de devis (partie droite de l'écran) se met à jour en temps réel via un flux JSON fragmenté (streaming).

## 3. Architecture de l'Interface (UI/UX)
L'interface est une Single Page Application divisée verticalement (50/50) :
* **Panneau de Contrôle (Gauche)** : 
    - Zone de chat affichant l'historique des échanges.
    - Bouton d'activation du microphone avec retour visuel d'onde sonore.
* **Aperçu Documentaire (Droite)** : 
    - Rendu fidèle d'un devis A4 (CSS Tailwind).
    - **Édition WYSIWYG** : Possibilité de cliquer sur n'importe quel champ pour corriger manuellement une erreur de l'IA.

## 4. Stack Technique & Décisions d'Architecture
* **Framework** : Next.js 15+ pour bénéficier des API Routes (sécurisation des clés API) et du rendu hybride.
* **Orchestration IA** : Vercel AI SDK. Choisi pour sa capacité à gérer le streaming d'objets JSON partiels (`useObject`), offrant une interface ultra-réactive.
* **Validation au Runtime** : Zod. Indispensable pour s'assurer que les données générées par le LLM respectent strictement la structure attendue par le composant de facturation.
* **Stockage** : `localStorage` pour les données persistantes de l'émetteur (profil utilisateur), évitant la complexité d'une base de données pour cette V1.

## 5. Schéma de Données (Data Model)
Le "cerveau" de l'application repose sur l'objet `Invoice`, validé par Zod :
- **Client** : Nom, Adresse.
- **Lignes de devis** : Description, Quantité, Prix HT, Taux de TVA.
- **Métadonnées** : Numéro de devis séquentiel, Date d'émission.
- **Calculés (Frontend)** : Totaux HT, Montants TVA, Total TTC.

## 6. Sécurité et Résilience
* **Gestion des Clés** : Utilisation de variables d'environnement (`.env.local`) pour protéger les accès OpenAI et Google.
* **Gestion des Erreurs** : Fallback automatique vers la saisie textuelle en cas d'échec du module Speech-to-Text.
* **Validation stricte** : Rejet de toute donnée IA ne respectant pas le schéma contractuel pour éviter les bugs d'affichage.