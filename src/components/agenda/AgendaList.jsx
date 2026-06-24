export default function AgendaList({ events }) {
  return (
    <section className="panel agenda-list">
      {events.map((event) => {
        const start = event.start?.dateTime ?? event.start?.date ?? event.start
        return (
          <article key={event.id} className="agenda-item">
            <time>{new Date(start).toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'short' })}</time>
            <strong>{event.summary}</strong>
          </article>
        )
      })}
    </section>
  )
}