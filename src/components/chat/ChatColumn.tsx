"use client"

import { useReducer, useState, useRef, useEffect } from "react"
import { invoiceReducer, initialInvoice } from "@/lib/invoice-reducer"
import { MessageBubble } from "./MessageBubble"
import { ChatInput } from "./ChatInput"

type Message = { role: "user" | "assistant"; content: string }

export const ChatColumn = () => {
  const [, dispatch] = useReducer(invoiceReducer, initialInvoice)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour ! Décrivez votre prestation et je génère le devis." },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: text }])
    setIsLoading(true)

    // Phase 4 : appel API generate-invoice
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Génération du devis… (routes API — Phase 4)" },
    ])
    setIsLoading(false)
    void dispatch
  }

  const handleMicClick = () => {
    // Phase 4 : appel API transcribe
    setIsRecording((prev) => !prev)
  }

  return (
    <section className="w-1/2 h-full border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="font-semibold text-gray-800">Copilot Devis</h1>
        <p className="text-xs text-gray-400">Dictez ou tapez votre prestation</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2">
              <span className="text-gray-400 text-sm animate-pulse">…</span>
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
  )
}
