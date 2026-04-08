import { z } from "zod"

export const InvoiceItemSchema = z.object({
  description: z.string(),
  quantite: z.number().min(1),
  prix_ht: z.number(),
  tva_taux: z.number(),
})

export const InvoiceSchema = z.object({
  client: z.object({
    nom: z.string(),
    adresse: z.string(),
  }),
  items: z.array(InvoiceItemSchema),
  numero_devis: z.string(),
  date: z.string(),
})

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>
export type Invoice = z.infer<typeof InvoiceSchema>
