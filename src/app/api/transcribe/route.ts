import { experimental_transcribe } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audio = formData.get("audio") as File | null

    if (!audio) {
      return NextResponse.json(
        { data: null, error: "Aucun fichier audio reçu" },
        { status: 400 }
      )
    }

    const result = await experimental_transcribe({
      model: openai.transcription("whisper-1"),
      audio: await audio.arrayBuffer(),
      providerOptions: {
        openai: { language: "fr" },
      },
    })

    return NextResponse.json({ data: { text: result.text }, error: null })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur de transcription"
    return NextResponse.json({ data: null, error: message }, { status: 500 })
  }
}
