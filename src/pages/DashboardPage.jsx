import DashboardCards from '../components/dashboard/DashboardCards'
import ClientsMap from '../components/maps/ClientsMap'
import { demoClients, demoOrders, demoVisits } from '../data/mockData'

export default function DashboardPage() {
  return (
    <>
      <header className="page-header">
        <span>Panoramica</span>
        <h1>Dashboard commerciale</h1>
        <p>Statistiche rapide per clienti, visite e ordini nel territorio.</p>
      </header>
      <DashboardCards clients={demoClients} visits={demoVisits} orders={demoOrders} />
      <section className="panel">
        <div className="section-heading">
          <h2>Clienti geolocalizzati</h2>
          <p>Mappa rapida dei punti vendita e istituti scolastici.</p>
        </div>
        <ClientsMap clients={demoClients} />
      </section>
    </>
  )
}