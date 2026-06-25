import { useEffect, useState } from 'react'
import AgendaList from '../components/agenda/AgendaList'
import { demoCalendarEvents } from '../data/mockData'
import { useAuth } from '../hooks/useAuth'
import { getGoogleCalendarEvents, isWorkEvent, WORK_EVENT_TAGS } from '../services/googleCalendar'

export default function AgendaPage() {
  const { accessToken } = useAuth()
  const [events, setEvents] = useState(() => demoCalendarEvents.filter(isWorkEvent))
  const [status, setStatus] = useState('Mostro solo eventi lavoro demo. Usa #lavoro, [lavoro] o lavoro per renderli visibili.')

  useEffect(() => {
    async function loadEvents() {
      if (!accessToken) return
      try {
        const googleEvents = await getGoogleCalendarEvents(accessToken)
        setEvents(googleEvents)
        setStatus('Eventi lavoro caricati da Google Calendar. Eventi pubblici e privati senza nomenclatura sono nascosti.')
      } catch (error) {
        setStatus(error.message)
      }
    }

    loadEvents()
  }, [accessToken])

  return (
    <>
      <header className="page-header">
        <span>Agenda</span>
        <h1>Calendario lavoro</h1>
        <p>{status}</p>
        <p className="tag-hint">Nomenclatura valida: {WORK_EVENT_TAGS.join(', ')}</p>
      </header>
      <AgendaList events={events} />
    </>
  )
}