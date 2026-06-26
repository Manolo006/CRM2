import { useState } from 'react'
import ClientLocationForm from '../components/clients/ClientLocationForm'
import ClientsTable from '../components/clients/ClientsTable'
import QuickClientModal from '../components/clients/QuickClientModal'
import { useRealtimeList } from '../hooks/useRealtimeList'
import { paths } from '../services/realtimeDatabase'

export default function ClientsPage() {
  const [editingClient, setEditingClient] = useState(null)
  const { items: clients, loading } = useRealtimeList(paths.clients)
  const activeCount = clients.filter((client) => ['Attivo', 'Disponibile'].includes(client.status)).length
  const prospectCount = clients.filter((client) => client.status?.toLowerCase().includes('prospect') || client.type?.toLowerCase().includes('prospect')).length

  return (
    <>
      <header className="page-hero">
        <div>
          <span>Archivio</span>
          <h1>Clienti</h1>
          <p>Gestisci anagrafiche, contatti e posizione dei clienti nel tuo territorio.</p>
        </div>
      </header>
      <section className="insight-grid">
        <article className="panel insight-card">
          <span className="eyebrow">Totale archivio</span>
          <strong>{clients.length}</strong>
          <p>Clienti presenti nel database.</p>
        </article>
        <article className="panel insight-card">
          <span className="eyebrow">Attivi</span>
          <strong>{activeCount}</strong>
          <p>Clienti pronti per visite e ordini.</p>
        </article>
        <article className="panel insight-card accent-card">
          <span className="eyebrow">Prospect</span>
          <strong>{prospectCount}</strong>
          <p>Opportunità da trasformare.</p>
        </article>
      </section>
      <ClientLocationForm />
      <QuickClientModal open={editingClient} onClose={() => setEditingClient(null)} />
      {loading ? (
        <section className="panel">Caricamento clienti...</section>
      ) : (
        <ClientsTable clients={clients} onEditClient={setEditingClient} />
      )}
    </>
  )
}