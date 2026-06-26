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
  const geolocatedClients = clients.filter((client) => Number.isFinite(Number(client.lat)) && Number.isFinite(Number(client.lng)))
  const latestClients = clients.slice(0, 3)

  return (
    <>
      <header className="page-hero row-header">
        <div>
          <span>Panoramica</span>
          <h1>Dashboard commerciale</h1>
          <p>Controlla territorio, clienti e attività della giornata da un unico pannello operativo.</p>
        </div>
        <button className="primary-button" type="button" onClick={() => setQuickModalOpen(true)}>
          + Aggiungi cliente rapido
        </button>
      </header>
      <QuickClientModal open={quickModalOpen} onClose={() => setQuickModalOpen(false)} />
      <DashboardCards clients={clients} visits={visits} orders={orders} />
      <section className="insight-grid">
        <article className="panel insight-card">
          <span className="eyebrow">Copertura</span>
          <strong>{geolocatedClients.length}/{clients.length || 0}</strong>
          <p>Clienti con coordinate valide e visibili sulla mappa.</p>
        </article>
        <article className="panel insight-card accent-card">
          <span className="eyebrow">Prossima azione</span>
          <strong>Follow-up</strong>
          <p>Apri agenda e programma visite per clienti senza contatto recente.</p>
        </article>
      </section>
      <section className="panel">
        <div className="section-heading">
          <h2>Clienti geolocalizzati</h2>
          <p>Mappa dei clienti salvati su Firebase Realtime Database.</p>
        </div>
        <ClientsMap clients={clients} />
      </section>
      <section className="panel">
        <div className="section-heading">
          <h2>Ultimi clienti</h2>
          <p>Accesso rapido agli ultimi record disponibili.</p>
        </div>
        <div className="compact-list">
          {latestClients.map((client) => (
            <article key={client.id} className="compact-item">
              <div>
                <strong>{client.name}</strong>
                <small>{client.city || client.location || 'Località non indicata'}</small>
              </div>
              <span className="pill">{client.type}</span>
            </article>
          ))}
          {!latestClients.length && <p>Nessun cliente salvato. Aggiungi il primo cliente rapido.</p>}
        </div>
      </section>
    </>
  )
}