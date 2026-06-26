export default function StatsCard({ label, value, hint }) {
  return (
    <article className="stat-card">
      <div>
        <span>{label}</span>
        <small>{hint}</small>
      </div>
      <strong>{value}</strong>
    </article>
  )
}