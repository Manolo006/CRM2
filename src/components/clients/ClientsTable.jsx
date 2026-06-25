import { useMemo, useState } from 'react'

const PAGE_SIZE = 3

export default function ClientsTable({ clients, onEditClient }) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('Tutti')
  const [page, setPage] = useState(1)

  const types = ['Tutti', ...new Set(clients.map((client) => client.type))]
  const filtered = useMemo(() => clients.filter((client) => {
    const matchesSearch = `${client.name} ${client.city}`.toLowerCase().includes(search.toLowerCase())
    const matchesType = type === 'Tutti' || client.type === type
    return matchesSearch && matchesType
  }), [clients, search, type])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function updateType(value) {
    setType(value)
    setPage(1)
  }

  return (
    <section className="panel">
      <div className="filters">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cerca cliente o città" />
        <select value={type} onChange={(event) => updateType(event.target.value)}>
          {types.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        {visible.length === 0 ? (
          <p>Nessun cliente salvato. Aggiungi una location con il form sopra.</p>
        ) : (
          <table>
            <thead>
              <tr><th>Cliente</th><th>Località</th><th>Tipo</th><th>Contatti</th><th>Maps</th><th>Stato</th><th>Azioni</th></tr>
            </thead>
            <tbody>
              {visible.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.city}</td>
                  <td>{client.type}</td>
                  <td>{client.mobile || client.phone || client.email || '-'}</td>
                  <td>{client.googleMapsUrl ? <a href={client.googleMapsUrl} target="_blank" rel="noreferrer">Maps</a> : `${client.lat}, ${client.lng}`}</td>
                  <td>{client.status}</td>
                  <td><button className="secondary-button" type="button" onClick={() => onEditClient(client)}>Modifica</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Precedente</button>
        <span>Pagina {page} di {pageCount}</span>
        <button disabled={page === pageCount} onClick={() => setPage(page + 1)}>Successiva</button>
      </div>
    </section>
  )
}