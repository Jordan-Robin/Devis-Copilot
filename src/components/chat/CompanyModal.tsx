"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export type Company = {
  nom: string
  adresse: string
  email: string
  telephone: string
  siren: string
  tva_intracom: string
}

const STORAGE_KEY = "copilot-devis-company"

const emptyCompany: Company = {
  nom: "",
  adresse: "",
  email: "",
  telephone: "",
  siren: "",
  tva_intracom: "",
}

type Props = {
  onClose: () => void
  onSave: (company: Company) => void
}

export const CompanyModal = ({ onClose, onSave }: Props) => {
  const [form, setForm] = useState<Company>(emptyCompany)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setForm(JSON.parse(stored) as Company)
      } catch {
        // données corrompues, on repart de zéro
      }
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    onSave(form)
    onClose()
  }

  const field = (
    label: string,
    key: keyof Company,
    options?: { placeholder?: string; multiline?: boolean }
  ) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-400 uppercase tracking-wide">{label}</label>
      {options?.multiline ? (
        <textarea
          rows={2}
          className="bg-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
          placeholder={options.placeholder}
          value={form[key]}
          onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
        />
      ) : (
        <input
          className="bg-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
          placeholder={options?.placeholder}
          value={form[key]}
          onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
        />
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modale */}
      <div className="relative bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700">
          <h2 className="font-semibold text-slate-100">Informations de l'entreprise</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Formulaire */}
        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          {field("Nom / Raison sociale", "nom", { placeholder: "Mon Entreprise SARL" })}
          {field("Adresse", "adresse", { placeholder: "12 rue de la Paix\n75001 Paris", multiline: true })}
          {field("Email", "email", { placeholder: "contact@monentreprise.fr" })}
          {field("Téléphone", "telephone", { placeholder: "+33 6 12 34 56 78" })}
          {field("SIREN", "siren", { placeholder: "123 456 789" })}
          {field("TVA intracommunautaire", "tva_intracom", { placeholder: "FR12 345678901" })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

export const loadCompany = (): Company | null => {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as Company
  } catch {
    return null
  }
}
