"use client"

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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-end gap-2">
        <textarea
          className="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32"
          rows={1}
          placeholder="Décrivez votre prestation… (Entrée pour envoyer)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={onMicClick}
          className={`p-2 rounded-xl transition-colors ${
            isRecording
              ? "bg-red-100 text-red-600 animate-pulse"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
  )
}
