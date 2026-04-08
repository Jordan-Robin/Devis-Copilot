"use client"

type Props = {
  role: "user" | "assistant"
  content: string
}

export const MessageBubble = ({ role, content }: Props) => {
  const isUser = role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-slate-700 text-slate-200 rounded-bl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  )
}
