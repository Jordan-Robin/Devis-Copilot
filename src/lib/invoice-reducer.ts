import type { Invoice, InvoiceItem } from "./schemas"

export type InvoiceAction =
  | { type: "SET_INVOICE"; payload: Invoice }
  | { type: "SET_CLIENT"; payload: Partial<Invoice["client"]> }
  | { type: "ADD_ITEM"; payload: InvoiceItem }
  | { type: "UPDATE_ITEM"; payload: { index: number; item: Partial<InvoiceItem> } }
  | { type: "REMOVE_ITEM"; payload: { index: number } }
  | { type: "SET_NUMERO_DEVIS"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "RESET" }

export const initialInvoice: Invoice = {
  client: { nom: "", adresse: "" },
  items: [],
  numero_devis: "DEV-2026-001",
  date: new Date().toLocaleDateString("fr-FR"),
}

export function invoiceReducer(state: Invoice, action: InvoiceAction): Invoice {
  switch (action.type) {
    case "SET_INVOICE":
      return action.payload

    case "SET_CLIENT":
      return { ...state, client: { ...state.client, ...action.payload } }

    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] }

    case "UPDATE_ITEM": {
      const items = state.items.map((item, i) =>
        i === action.payload.index ? { ...item, ...action.payload.item } : item
      )
      return { ...state, items }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((_, i) => i !== action.payload.index),
      }

    case "SET_NUMERO_DEVIS":
      return { ...state, numero_devis: action.payload }

    case "SET_DATE":
      return { ...state, date: action.payload }

    case "RESET":
      return initialInvoice

    default:
      return state
  }
}
