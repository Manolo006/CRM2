import StatsCard from './StatsCard'

export default function DashboardCards({ clients, visits, orders }) {
  const orderTotal = orders.reduce((sum, order) => sum + Number(order.total ?? 0), 0)

  return (
    <section className="stats-grid">
      <StatsCard label="Clienti totali" value={clients.length} hint="Cartolerie, scuole, grossisti" />
      <StatsCard label="Visite" value={visits.length} hint="Visite registrate" />
      <StatsCard label="Ordini" value={orders.length} hint={`Valore: € ${orderTotal.toLocaleString('it-IT')}`} />
    </section>
  )
}