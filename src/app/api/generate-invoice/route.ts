import { streamObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { InvoiceSchema } from "@/lib/schemas"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const text = await req.json() as string

    const result = streamObject({
      model: openai("gpt-4o-mini"),
      schema: InvoiceSchema,
      maxRetries: 0,
      system: `Tu es un assistant de génération de devis pour auto-entrepreneurs français.
À partir d'une description en langage naturel, extrais les informations et génère un objet JSON valide correspondant au schéma fourni.
Règles :
- Réponds UNIQUEMENT avec le JSON, sans texte autour.
- Langue : français.
- Si une information est absente, utilise la valeur par défaut du schéma.
- Les prix sont en euros HT.
- Le taux de TVA par défaut est 20% (auto-entrepreneurs peuvent être en franchise de TVA : utilise 0 si mentionné).
- Génère un numéro de devis au format DEV-YYYY-NNN (ex: DEV-2026-001).
- La date est celle d'aujourd'hui au format JJ/MM/AAAA.`,
      prompt: text,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur de génération"
    return Response.json({ data: null, error: message }, { status: 500 })
  }
}
