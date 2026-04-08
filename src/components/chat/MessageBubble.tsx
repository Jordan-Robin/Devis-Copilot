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
            : "bg-gray-100 text-gray-800 rounded-bl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  )
}
