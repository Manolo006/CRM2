export const demoClients = [
  { id: '1', name: 'Cartolibreria Dante', city: 'Milano', type: 'Cartoleria', agent: 'Manuel', lat: 45.4642, lng: 9.19, lastVisit: '2026-06-18', status: 'Attivo' },
  { id: '2', name: 'Scuola Primaria Collodi', city: 'Bergamo', type: 'Scuola', agent: 'Manuel', lat: 45.6983, lng: 9.6773, lastVisit: '2026-06-12', status: 'Da visitare' },
  { id: '3', name: 'Emporio Didattico', city: 'Brescia', type: 'Grossista', agent: 'Manuel', lat: 45.5416, lng: 10.2118, lastVisit: '2026-06-03', status: 'Attivo' },
  { id: '4', name: 'Carta & Zaino', city: 'Como', type: 'Cartoleria', agent: 'Manuel', lat: 45.8081, lng: 9.0852, lastVisit: '2026-05-26', status: 'Prospect' },
  { id: '5', name: 'Istituto Marconi', city: 'Monza', type: 'Scuola', agent: 'Manuel', lat: 45.5845, lng: 9.2744, lastVisit: '2026-06-20', status: 'Attivo' },
]

export const demoVisits = [
  { id: 'v1', clientId: '1', date: '2026-06-18', note: 'Presentato nuovo catalogo astucci.' },
  { id: 'v2', clientId: '2', date: '2026-06-12', note: 'Richiesta preventivo quaderni.' },
  { id: 'v3', clientId: '5', date: '2026-06-20', note: 'Ordine materiale artistico.' },
]

export const demoOrders = [
  { id: 'o1', clientId: '1', total: 1280, date: '2026-06-19' },
  { id: 'o2', clientId: '3', total: 2460, date: '2026-06-10' },
  { id: 'o3', clientId: '5', total: 890, date: '2026-06-20' },
]

export const demoCalendarEvents = [
  { id: 'e1', summary: '[Lavoro] Visita Cartolibreria Dante', start: '2026-06-25T09:30:00', location: 'Milano' },
  { id: 'e2', summary: '#lavoro Follow-up Scuola Collodi', start: '2026-06-26T11:00:00', location: 'Bergamo' },
  { id: 'e3', summary: 'Lavoro - Consegna cataloghi Como', start: '2026-06-27T15:00:00', location: 'Como' },
  { id: 'e4', summary: 'Festa della Liberazione', start: '2026-04-25' },
  { id: 'e5', summary: 'Cena privata', start: '2026-06-28T20:00:00' },
]