"use client"

import { useRef, useEffect } from "react"
import { Mic, Send } from "lucide-react"

type Props = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onMicClick: () => void
  isRecording: boolean
  isLoading: boolean
}

export const ChatInput = ({
  value,
  onChange,
  onSubmit,
  onMicClick,
  isRecording,
  isLoading,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize : ajuste la hauteur au contenu, min 80px
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.max(80, el.scrollHeight)}px`
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="border-t border-slate-700 p-4">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          className="flex-1 resize-none rounded-xl bg-slate-700 border border-slate-600 text-slate-100 placeholder:text-slate-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ minHeight: "80px", maxHeight: "200px", overflowY: "auto" }}
          placeholder="Décrivez votre prestation… (Entrée pour envoyer, Maj+Entrée pour un saut de ligne)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <div className="flex flex-col gap-2">
          <button
            onClick={onMicClick}
            className={`p-2 rounded-xl transition-colors ${
              isRecording
                ? "bg-red-500/20 text-red-400 animate-pulse"
                : "bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200"
            }`}
            title={isRecording ? "Arrêter l'enregistrement" : "Dicter"}
          >
            <Mic size={20} />
          </button>
          <button
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Envoyer"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
