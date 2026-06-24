import { useEffect, useState } from 'react'
import AgendaList from '../components/agenda/AgendaList'
import { demoCalendarEvents } from '../data/mockData'
import { useAuth } from '../hooks/useAuth'
import { getGoogleCalendarEvents } from '../services/googleCalendar'

export default function AgendaPage() {
  const { accessToken } = useAuth()
  const [events, setEvents] = useState(demoCalendarEvents)
  const [status, setStatus] = useState('Eventi demo caricati. Accedi con scope Calendar per dati reali.')

  useEffect(() => {
    async function loadEvents() {
      if (!accessToken) return
      try {
        const googleEvents = await getGoogleCalendarEvents(accessToken)
        setEvents(googleEvents)
        setStatus('Eventi caricati da Google Calendar.')
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
        <h1>Google Calendar</h1>
        <p>{status}</p>
      </header>
      <AgendaList events={events} />
    </>
  )
}