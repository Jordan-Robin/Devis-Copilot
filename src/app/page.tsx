export default function Home() {
  return (
    <main className="flex h-screen">
      {/* Colonne gauche — Chat & Input */}
      <section className="w-1/2 h-full border-r border-gray-200 flex flex-col">
        <p className="text-gray-400 m-auto">Chat — Phase 3</p>
      </section>

      {/* Colonne droite — Aperçu devis */}
      <section className="w-1/2 h-full flex flex-col">
        <p className="text-gray-400 m-auto">Invoice Preview — Phase 3</p>
      </section>
    </main>
  )
}
