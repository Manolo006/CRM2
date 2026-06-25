import { useState } from 'react'
import QuickClientModal from '../components/clients/QuickClientModal'
import DashboardCards from '../components/dashboard/DashboardCards'
import ClientsMap from '../components/maps/ClientsMap'
import { useRealtimeList } from '../hooks/useRealtimeList'
import { paths } from '../services/realtimeDatabase'

export default function DashboardPage() {
  const [quickModalOpen, setQuickModalOpen] = useState(false)
  const { items: clients } = useRealtimeList(paths.clients)
  const { items: visits } = useRealtimeList(paths.visits)
  const { items: orders } = useRealtimeList(paths.orders)

  return (
    <>
      <header className="page-header row-header">
        <div>
          <span>Panoramica</span>
          <h1>Dashboard commerciale</h1>
          <p>Statistiche rapide per clienti, visite e ordini nel territorio.</p>
        </div>
        <button className="primary-button" type="button" onClick={() => setQuickModalOpen(true)}>
          + Aggiungi cliente rapido
        </button>
      </header>
      <QuickClientModal open={quickModalOpen} onClose={() => setQuickModalOpen(false)} />
      <DashboardCards clients={clients} visits={visits} orders={orders} />
      <section className="panel">
        <div className="section-heading">
          <h2>Clienti geolocalizzati</h2>
          <p>Mappa dei clienti salvati su Firebase Realtime Database.</p>
        </div>
        <ClientsMap clients={clients} />
      </section>
    </>
  )
}