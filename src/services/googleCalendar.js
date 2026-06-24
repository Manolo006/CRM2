export async function getGoogleCalendarEvents(accessToken) {
  if (!accessToken) return []

  const params = new URLSearchParams({
    calendarId: 'primary',
    singleEvents: 'true',
    orderBy: 'startTime',
    timeMin: new Date().toISOString(),
    maxResults: '10',
  })

  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) throw new Error('Impossibile leggere Google Calendar')
  const data = await response.json()
  return data.items ?? []
}