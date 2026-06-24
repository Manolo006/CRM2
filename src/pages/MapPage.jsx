import ClientsMap from '../components/maps/ClientsMap'
import { demoClients } from '../data/mockData'

export default function MapPage() {
  return (
    <>
      <header className="page-header">
        <span>Territorio</span>
        <h1>Mappa clienti</h1>
        <p>Leaflet mostra clienti geolocalizzati con popup informativi.</p>
      </header>
      <section className="panel tall-map">
        <ClientsMap clients={demoClients} />
      </section>
    </>
  )
}