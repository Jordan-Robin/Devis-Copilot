"use client"

import { useState, useEffect } from "react"
import { experimental_useObject as useObject } from "@ai-sdk/react"
import { InvoiceSchema } from "@/lib/schemas"
import { ChatColumn } from "@/components/chat/ChatColumn"
import { InvoicePreview } from "@/components/invoice/InvoicePreview"
import { loadCompany, type Company } from "@/components/chat/CompanyModal"

export default function Home() {
  const { object, submit, isLoading, error } = useObject({
    api: "/api/generate-invoice",
    schema: InvoiceSchema,
  })

  const [company, setCompany] = useState<Company | null>(null)

  useEffect(() => {
    setCompany(loadCompany())
  }, [])

  return (
    <main className="flex h-screen">
      <ChatColumn
        onSubmit={submit}
        isLoading={isLoading}
        error={error}
        onCompanyChange={setCompany}
      />
      <InvoicePreview invoice={object} company={company} />
    </main>
  )
}
