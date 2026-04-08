import { ChatColumn } from "@/components/chat/ChatColumn"
import { InvoicePreview } from "@/components/invoice/InvoicePreview"

export default function Home() {
  return (
    <main className="flex h-screen">
      <ChatColumn />
      <InvoicePreview />
    </main>
  )
}
