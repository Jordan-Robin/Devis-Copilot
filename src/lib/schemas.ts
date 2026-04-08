import { z } from "zod"

export const InvoiceItemSchema = z.object({
  description: z.string(),
  quantite: z.number().min(1).default(1),
  prix_ht: z.number(),
  tva_taux: z.number().default(20),
})

export const InvoiceSchema = z.object({
  client: z.object({
    nom: z.string().default(""),
    adresse: z.string().default(""),
  }),
  items: z.array(InvoiceItemSchema).default([]),
  numero_devis: z.string().default("DEV-2026-001"),
  date: z.string().default(new Date().toLocaleDateString("fr-FR")),
})

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>
export type Invoice = z.infer<typeof InvoiceSchema>
