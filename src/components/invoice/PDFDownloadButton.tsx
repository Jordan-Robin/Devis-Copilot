"use client"

import { PDFDownloadLink } from "@react-pdf/renderer"
import { Download } from "lucide-react"
import { InvoicePDF } from "./InvoicePDF"
import type { Invoice } from "@/types/invoice"
import type { Company } from "@/components/chat/CompanyModal"

type Props = {
  invoice: Invoice
  company: Company | null
}

export const PDFDownloadButton = ({ invoice, company }: Props) => {
  const filename = `devis-${invoice.numero_devis}-${invoice.client.nom || "client"}.pdf`
    .toLowerCase()
    .replace(/\s+/g, "-")

  return (
    <PDFDownloadLink
      document={<InvoicePDF invoice={invoice} company={company} />}
      fileName={filename}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          className="flex items-center gap-1.5 text-xs border border-gray-200 rounded px-3 py-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-wait transition-colors text-gray-600"
        >
          <Download size={13} />
          {loading ? "Génération…" : "Exporter PDF"}
        </button>
      )}
    </PDFDownloadLink>
  )
}
