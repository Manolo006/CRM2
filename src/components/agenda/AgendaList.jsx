import { useMemo, useState } from 'react'

const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']

function getEventStart(event) {
  return event.start?.dateTime ?? event.start?.date ?? event.start
}

function formatDateKey(date) {
  return date.toISOString().slice(0, 10)
}

function formatMonth(date) {
  return new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(date)
}

function normalizeEvent(event) {
  const start = getEventStart(event)
  const date = start ? new Date(start) : null

  return {
    ...event,
    start,
    date,
    dateKey: date && !Number.isNaN(date.getTime()) ? formatDateKey(date) : null,
  }
}

function buildCalendarDays(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startOffset = (firstDay.getDay() + 6) % 7
  const days = []

  for (let index = 0; index < startOffset; index += 1) {
    days.push(null)
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day))
  }

  return days
}

export default function AgendaList({ events }) {
  const [monthDate, setMonthDate] = useState(() => new Date())
  const normalizedEvents = useMemo(() => events.map(normalizeEvent).filter((event) => event.dateKey), [events])
  const calendarDays = useMemo(() => buildCalendarDays(monthDate), [monthDate])
  const eventsByDate = useMemo(() => normalizedEvents.reduce((groups, event) => {
    groups[event.dateKey] = [...(groups[event.dateKey] ?? []), event]
    return groups
  }, {}), [normalizedEvents])
  const visibleEvents = normalizedEvents
    .filter((event) => event.date.getMonth() === monthDate.getMonth() && event.date.getFullYear() === monthDate.getFullYear())
    .sort((first, second) => first.date - second.date)

  function changeMonth(offset) {
    setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))
  }

  return (
    <section className="panel agenda-calendar">
      <div className="calendar-toolbar">
        <button className="ghost-button" type="button" onClick={() => changeMonth(-1)}>Mese precedente</button>
        <h2>{formatMonth(monthDate)}</h2>
        <button className="ghost-button" type="button" onClick={() => changeMonth(1)}>Mese successivo</button>
      </div>

      <div className="calendar-grid">
        {weekDays.map((day) => <strong key={day} className="calendar-weekday">{day}</strong>)}
        {calendarDays.map((day, index) => {
          const dateKey = day ? formatDateKey(day) : `empty-${index}`
          const dayEvents = day ? eventsByDate[dateKey] ?? [] : []

          return (
            <article key={dateKey} className={`calendar-day${dayEvents.length ? ' has-events' : ''}`}>
              {day && <time dateTime={dateKey}>{day.getDate()}</time>}
              {dayEvents.map((event) => (
                <span key={event.id} className="calendar-event">{event.summary}</span>
              ))}
            </article>
          )
        })}
      </div>

      <div className="agenda-list">
        <h3>Eventi lavoro del mese</h3>
        {visibleEvents.map((event) => (
          <article key={event.id} className="agenda-item">
            <time dateTime={event.start}>{event.date.toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'short' })}</time>
            <strong>{event.summary ?? 'Evento lavoro senza titolo'}</strong>
            {event.location && <small>{event.location}</small>}
          </article>
        ))}
        {!visibleEvents.length && <p>Nessun evento lavoro in questo mese.</p>}
      </div>
    </section>
  )
}