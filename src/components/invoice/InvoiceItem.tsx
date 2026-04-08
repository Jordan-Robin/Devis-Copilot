"use client"

import type { InvoiceItem as InvoiceItemType } from "@/types/invoice"

type Props = {
  item: InvoiceItemType
  index: number
  onChange: (index: number, item: Partial<InvoiceItemType>) => void
  onRemove: (index: number) => void
}

export const InvoiceItem = ({ item, index, onChange, onRemove }: Props) => {
  const totalHT = item.quantite * item.prix_ht
  const totalTTC = totalHT * (1 + item.tva_taux / 100)

  return (
    <tr className="border-b border-gray-100 group">
      <td className="py-2 pr-3">
        <input
          className="w-full text-sm focus:outline-none focus:bg-blue-50 rounded px-1"
          value={item.description ?? ""}
          onChange={(e) => onChange(index, { description: e.target.value })}
        />
      </td>
      <td className="py-2 pr-3 w-16">
        <input
          type="number"
          min={1}
          className="w-full text-sm text-center focus:outline-none focus:bg-blue-50 rounded px-1"
          value={item.quantite ?? 0}
          onChange={(e) => onChange(index, { quantite: Number(e.target.value) })}
        />
      </td>
      <td className="py-2 pr-3 w-24">
        <input
          type="number"
          className="w-full text-sm text-right focus:outline-none focus:bg-blue-50 rounded px-1"
          value={item.prix_ht ?? 0}
          onChange={(e) => onChange(index, { prix_ht: Number(e.target.value) })}
        />
      </td>
      <td className="py-2 pr-3 w-16">
        <input
          type="number"
          className="w-full text-sm text-center focus:outline-none focus:bg-blue-50 rounded px-1"
          value={item.tva_taux ?? 0}
          onChange={(e) => onChange(index, { tva_taux: Number(e.target.value) })}
        />
      </td>
      <td className="py-2 text-sm text-right w-24">{totalHT.toFixed(2)} €</td>
      <td className="py-2 text-sm text-right w-24">{totalTTC.toFixed(2)} €</td>
      <td className="py-2 w-8 text-center">
        <button
          onClick={() => onRemove(index)}
          className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
          title="Supprimer"
        >
          ✕
        </button>
      </td>
    </tr>
  )
}
