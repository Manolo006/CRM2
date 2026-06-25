export const WORK_EVENT_TAGS = ['#lavoro', '[lavoro]', 'lavoro']

export function isWorkEvent(event) {
  const searchableText = [
    event.summary,
    event.description,
    event.location,
  ].filter(Boolean).join(' ').toLowerCase()

  return WORK_EVENT_TAGS.some((tag) => searchableText.includes(tag))
}

export async function getGoogleCalendarEvents(accessToken) {
  if (!accessToken) return []

  const params = new URLSearchParams({
    calendarId: 'primary',
    singleEvents: 'true',
    orderBy: 'startTime',
    timeMin: new Date().toISOString(),
    maxResults: '50',
  })

  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) throw new Error('Impossibile leggere Google Calendar')
  const data = await response.json()
  return (data.items ?? []).filter(isWorkEvent)
}