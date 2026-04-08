import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import type { Invoice } from "@/types/invoice"
import type { Company } from "@/components/chat/CompanyModal"

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1f2937",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 9,
    color: "#9ca3af",
    marginTop: 2,
  },
  companyName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  companyDetail: {
    fontSize: 9,
    color: "#9ca3af",
    textAlign: "right",
    marginTop: 2,
  },
  section: {
    backgroundColor: "#f9fafb",
    borderRadius: 4,
    padding: 12,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 8,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  clientName: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontSize: 8,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 6,
  },
  colDesc: { flex: 3 },
  colQty: { width: 40, textAlign: "center" },
  colPU: { width: 64, textAlign: "right" },
  colTVA: { width: 40, textAlign: "center" },
  colHT: { width: 64, textAlign: "right" },
  colTTC: { width: 64, textAlign: "right" },
  totals: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
    paddingVertical: 2,
  },
  totalLabel: { color: "#6b7280" },
  totalSeparator: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    width: 180,
    marginVertical: 4,
  },
  totalFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
    paddingTop: 4,
  },
  totalFinalText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#111827",
  },
})

type Props = {
  invoice: Invoice
  company: Company | null
}

export const InvoicePDF = ({ invoice, company }: Props) => {
  const totalHT = invoice.items.reduce((s, i) => s + i.quantite * i.prix_ht, 0)
  const totalTVA = invoice.items.reduce(
    (s, i) => s + i.quantite * i.prix_ht * (i.tva_taux / 100),
    0
  )
  const totalTTC = totalHT + totalTVA

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>DEVIS</Text>
            <Text style={styles.subtitle}>N° {invoice.numero_devis}</Text>
            <Text style={styles.subtitle}>{invoice.date}</Text>
          </View>
          <View>
            {company?.nom ? (
              <>
                <Text style={styles.companyName}>{company.nom}</Text>
                {company.adresse ? <Text style={styles.companyDetail}>{company.adresse}</Text> : null}
                {company.email ? <Text style={styles.companyDetail}>{company.email}</Text> : null}
                {company.telephone ? <Text style={styles.companyDetail}>{company.telephone}</Text> : null}
                {company.siren ? <Text style={styles.companyDetail}>SIREN : {company.siren}</Text> : null}
                {company.tva_intracom ? <Text style={styles.companyDetail}>TVA : {company.tva_intracom}</Text> : null}
              </>
            ) : (
              <Text style={styles.companyDetail}>Entreprise non configurée</Text>
            )}
          </View>
        </View>

        {/* Client */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Destinataire</Text>
          <Text style={styles.clientName}>{invoice.client.nom}</Text>
          {invoice.client.adresse ? <Text>{invoice.client.adresse}</Text> : null}
        </View>

        {/* Tableau */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colDesc]}>Description</Text>
          <Text style={[styles.tableHeaderText, styles.colQty]}>Qté</Text>
          <Text style={[styles.tableHeaderText, styles.colPU]}>PU HT</Text>
          <Text style={[styles.tableHeaderText, styles.colTVA]}>TVA</Text>
          <Text style={[styles.tableHeaderText, styles.colHT]}>Total HT</Text>
          <Text style={[styles.tableHeaderText, styles.colTTC]}>Total TTC</Text>
        </View>

        {invoice.items.map((item, i) => {
          const ht = item.quantite * item.prix_ht
          const ttc = ht * (1 + item.tva_taux / 100)
          return (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantite}</Text>
              <Text style={styles.colPU}>{item.prix_ht.toFixed(2)} €</Text>
              <Text style={styles.colTVA}>{item.tva_taux}%</Text>
              <Text style={styles.colHT}>{ht.toFixed(2)} €</Text>
              <Text style={styles.colTTC}>{ttc.toFixed(2)} €</Text>
            </View>
          )
        })}

        {/* Totaux */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total HT</Text>
            <Text>{totalHT.toFixed(2)} €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TVA</Text>
            <Text>{totalTVA.toFixed(2)} €</Text>
          </View>
          <View style={styles.totalSeparator} />
          <View style={styles.totalFinal}>
            <Text style={styles.totalFinalText}>Total TTC</Text>
            <Text style={styles.totalFinalText}>{totalTTC.toFixed(2)} €</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
