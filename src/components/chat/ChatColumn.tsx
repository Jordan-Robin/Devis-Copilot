"use client"

import { useState, useRef, useEffect } from "react"
import { Settings } from "lucide-react"
import { MessageBubble } from "./MessageBubble"
import { ChatInput } from "./ChatInput"
import { CompanyModal } from "./CompanyModal"

type Message = { role: "user" | "assistant"; content: string }

type Props = {
  onSubmit: (text: string) => void
  isLoading: boolean
  error?: Error
  onCompanyChange: (company: import("./CompanyModal").Company) => void
}

export const ChatColumn = ({ onSubmit, isLoading, error, onCompanyChange }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour ! Décrivez votre prestation et je génère le devis." },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  useEffect(() => {
    if (!error) return
    const message = error.message.includes("quota")
      ? "Quota API dépassé. Vérifie ton plan de facturation."
      : `Erreur : ${error.message}`
    setMessages((prev) => [...prev, { role: "assistant", content: message }])
  }, [error])

  const handleSubmit = () => {
    const text = input.trim()
    if (!text || isLoading) return

    setMessages((prev) => [...prev, { role: "user", content: text }])
    setInput("")
    onSubmit(text)

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Je génère votre devis…" },
    ])
  }

  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data)

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop())
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const formData = new FormData()
        formData.append("audio", blob, "recording.webm")

        try {
          const res = await fetch("/api/transcribe", { method: "POST", body: formData })
          const { data, error } = await res.json() as { data: { text: string } | null; error: string | null }

          if (error || !data) {
            setMessages((prev) => [...prev, { role: "assistant", content: `Erreur de transcription : ${error}` }])
            return
          }

          setInput(data.text)
        } catch {
          setMessages((prev) => [...prev, { role: "assistant", content: "Impossible de transcrire l'audio." }])
        }
      }

      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Microphone inaccessible. Vérifiez les permissions." }])
    }
  }

  return (
    <>
      <section className="w-1/2 h-full flex flex-col bg-slate-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-slate-100">Copilot Devis</h1>
            <p className="text-xs text-slate-400">Dictez ou tapez votre prestation</p>
          </div>
          <button
            onClick={() => setShowCompanyModal(true)}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 border border-slate-600 hover:border-slate-400 rounded-lg px-3 py-1.5 transition-colors"
            title="Informations de l'entreprise"
          >
            <Settings size={14} />
            Mon entreprise
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} content={msg.content} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-4 py-2">
                <span className="text-slate-400 text-sm animate-pulse">…</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          onMicClick={handleMicClick}
          isRecording={isRecording}
          isLoading={isLoading}
        />
      </section>

      {showCompanyModal && (
        <CompanyModal
          onClose={() => setShowCompanyModal(false)}
          onSave={onCompanyChange}
        />
      )}
    </>
  )
}
