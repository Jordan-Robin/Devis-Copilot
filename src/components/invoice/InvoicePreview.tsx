"use client"

import { useReducer, useEffect } from "react"
import { invoiceReducer, initialInvoice } from "@/lib/invoice-reducer"
import { InvoiceSchema } from "@/lib/schemas"
import { InvoiceItem } from "./InvoiceItem"
import type { Company } from "@/components/chat/CompanyModal"
import type { DeepPartial } from "ai"
import type { Invoice, InvoiceItem as InvoiceItemType } from "@/types/invoice"

type Props = {
  invoice: DeepPartial<Invoice> | undefined
  company: Company | null
}

export const InvoicePreview = ({ invoice: aiInvoice, company }: Props) => {
  const [invoice, dispatch] = useReducer(invoiceReducer, initialInvoice)

  // Synchronise le state local quand l'IA génère un nouveau devis
  useEffect(() => {
    if (!aiInvoice) return
    const parsed = InvoiceSchema.safeParse(aiInvoice)
    if (parsed.success) {
      dispatch({ type: "SET_INVOICE", payload: parsed.data })
    }
  }, [aiInvoice])

  const totalHT = invoice.items.reduce((sum, i) => sum + i.quantite * i.prix_ht, 0)
  const totalTVA = invoice.items.reduce(
    (sum, i) => sum + i.quantite * i.prix_ht * (i.tva_taux / 100),
    0
  )
  const totalTTC = totalHT + totalTVA

  const handleChange = (index: number, item: Partial<InvoiceItemType>) => {
    dispatch({ type: "UPDATE_ITEM", payload: { index, item } })
  }

  const handleRemove = (index: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { index } })
  }

  // Affichage progressif pendant le streaming (données partielles de l'IA)
  const displayClient = aiInvoice?.client ?? invoice.client
  const displayItems = (aiInvoice?.items ?? invoice.items) as InvoiceItemType[]
  const displayNumero = aiInvoice?.numero_devis ?? invoice.numero_devis
  const displayDate = aiInvoice?.date ?? invoice.date

  return (
    <section className="w-1/2 h-full flex flex-col bg-gray-50 overflow-y-auto">
      {/* Header toolbar */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Aperçu du devis</h2>
        <button className="text-xs text-gray-400 border border-gray-200 rounded px-3 py-1 hover:bg-gray-50">
          Exporter PDF — Phase 5
        </button>
      </div>

      {/* Document A4 */}
      <div className="flex-1 p-6 flex justify-center">
        <div className="bg-white shadow-sm rounded w-full max-w-2xl p-8 flex flex-col gap-6 text-sm text-gray-800">
          {/* Entête */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xl font-bold text-gray-900">DEVIS</p>
              <p className="text-gray-400 text-xs">N° {displayNumero}</p>
              <p className="text-gray-400 text-xs">{displayDate}</p>
            </div>
            <div className="text-right">
              {company?.nom ? (
                <>
                  <p className="font-semibold">{company.nom}</p>
                  {company.adresse && <p className="text-gray-400 text-xs whitespace-pre-line">{company.adresse}</p>}
                  {company.email && <p className="text-gray-400 text-xs">{company.email}</p>}
                  {company.telephone && <p className="text-gray-400 text-xs">{company.telephone}</p>}
                  {company.siren && <p className="text-gray-400 text-xs">SIREN : {company.siren}</p>}
                  {company.tva_intracom && <p className="text-gray-400 text-xs">TVA : {company.tva_intracom}</p>}
                </>
              ) : (
                <>
                  <p className="font-semibold text-gray-300">Votre entreprise</p>
                  <p className="text-gray-300 text-xs italic">Cliquez sur "Mon entreprise" pour configurer</p>
                </>
              )}
            </div>
          </div>

          {/* Client */}
          <div className="border border-gray-100 rounded p-4 bg-gray-50">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Destinataire</p>
            {displayClient?.nom ? (
              <>
                <p className="font-medium">{displayClient.nom}</p>
                <p className="text-gray-500 whitespace-pre-line">{displayClient.adresse}</p>
              </>
            ) : (
              <p className="text-gray-300 italic">Client généré par l'IA…</p>
            )}
          </div>

          {/* Tableau des prestations */}
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 text-xs text-gray-400 uppercase tracking-wide">
                  <th className="text-left pb-2 pr-3">Description</th>
                  <th className="pb-2 pr-3 w-16">Qté</th>
                  <th className="text-right pb-2 pr-3 w-24">PU HT</th>
                  <th className="pb-2 pr-3 w-16">TVA %</th>
                  <th className="text-right pb-2 w-24">Total HT</th>
                  <th className="text-right pb-2 w-24">Total TTC</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {displayItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-300 italic text-sm">
                      Les prestations apparaîtront ici…
                    </td>
                  </tr>
                ) : (
                  displayItems.map((item, i) => (
                    <InvoiceItem
                      key={i}
                      item={item}
                      index={i}
                      onChange={handleChange}
                      onRemove={handleRemove}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Totaux */}
          <div className="ml-auto w-56 border-t border-gray-200 pt-4 space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Total HT</span>
              <span>{totalHT.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>TVA</span>
              <span>{totalTVA.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-2 mt-1">
              <span>Total TTC</span>
              <span>{totalTTC.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
