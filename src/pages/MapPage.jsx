import ClientsMap from '../components/maps/ClientsMap'
import ClientLocationForm from '../components/clients/ClientLocationForm'
import { useRealtimeList } from '../hooks/useRealtimeList'
import { paths } from '../services/realtimeDatabase'

export default function MapPage() {
  const { items: clients, loading } = useRealtimeList(paths.clients)

  return (
    <>
      <header className="page-header">
        <span>Territorio</span>
        <h1>Mappa clienti</h1>
        <p>Leaflet mostra le location salvate su Firebase.</p>
      </header>
      <ClientLocationForm />
      <section className="panel tall-map">
        {loading ? <p>Caricamento mappa...</p> : <ClientsMap clients={clients} />}
      </section>
    </>
  )
}