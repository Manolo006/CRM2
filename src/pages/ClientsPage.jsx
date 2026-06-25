import { useState } from 'react'
import ClientLocationForm from '../components/clients/ClientLocationForm'
import ClientsTable from '../components/clients/ClientsTable'
import QuickClientModal from '../components/clients/QuickClientModal'
import { useRealtimeList } from '../hooks/useRealtimeList'
import { paths } from '../services/realtimeDatabase'

export default function ClientsPage() {
  const [editingClient, setEditingClient] = useState(null)
  const { items: clients, loading } = useRealtimeList(paths.clients)

  return (
    <>
      <header className="page-header">
        <div>
          <span>Archivio</span>
          <h1>Clienti</h1>
          <p>Aggiungi location e consulta clienti salvati su Firebase.</p>
        </div>
      </header>
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