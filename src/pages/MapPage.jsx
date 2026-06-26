import ClientsMap from '../components/maps/ClientsMap'
import ClientLocationForm from '../components/clients/ClientLocationForm'
import { useRealtimeList } from '../hooks/useRealtimeList'
import { paths } from '../services/realtimeDatabase'

export default function MapPage() {
  const { items: clients, loading } = useRealtimeList(paths.clients)
  const mappedCount = clients.filter((client) => Number.isFinite(Number(client.lat)) && Number.isFinite(Number(client.lng))).length

  return (
    <>
      <header className="page-hero row-header">
        <div>
          <span>Territorio</span>
          <h1>Mappa clienti</h1>
          <p>Visualizza copertura territoriale e aggiungi nuove coordinate cliente.</p>
        </div>
        <div className="hero-meter">
          <strong>{mappedCount}</strong>
          <small>clienti in mappa</small>
        </div>
      </header>
      <ClientLocationForm />
      <section className="panel tall-map">
        <div className="section-heading">
          <h2>Vista territorio</h2>
          <p>{loading ? 'Caricamento dati...' : `${mappedCount} location valide su ${clients.length} clienti.`}</p>
        </div>
        {loading ? <p>Caricamento mappa...</p> : <ClientsMap clients={clients} />}
      </section>
    </>
  )
}