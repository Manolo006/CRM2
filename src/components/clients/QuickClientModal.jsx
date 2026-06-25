import { useEffect, useState } from 'react'
import { deleteClient, saveClient, updateClient } from '../../services/realtimeDatabase'

const initialForm = {
  firstName: '',
  lastName: '',
  companyName: '',
  location: '',
  type: 'Cartoleria',
  status: 'Disponibile',
  phone: '',
  mobile: '',
  email: '',
  secondaryEmail: '',
  note: '',
  lat: '',
  lng: '',
}

const customerTypes = [
  'Centro commerciale',
  'Maury\'s / casalinghi',
  'Cartoleria',
  'Negozio cinese',
  'Grande distribuzione',
  'Scuola',
  'Grossista',
  'Altro',
]

const statuses = [
  'Disponibile',
  'In lavorazione',
  'Nota da vedere dopo',
  'Non interessato',
]

function buildMapsUrl(form) {
  const query = [form.companyName, form.location].filter(Boolean).join(' ')
  if (query) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
  if (form.lat && form.lng) return `https://www.google.com/maps/search/?api=1&query=${form.lat},${form.lng}`
  return ''
}

export default function QuickClientModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [locating, setLocating] = useState(false)
  const [deleteStep, setDeleteStep] = useState(0)

  const isEdit = Boolean(open && typeof open === 'object')
  const client = isEdit ? open : null

  useEffect(() => {
    if (!open) return

    setMessage('')
    setDeleteStep(0)
    if (isEdit) {
      setForm({
        firstName: client.firstName ?? '',
        lastName: client.lastName ?? '',
        companyName: client.companyName ?? client.name ?? '',
        location: client.location ?? client.city ?? '',
        type: client.type ?? 'Cartoleria',
        status: client.status ?? 'Disponibile',
        phone: client.phone ?? '',
        mobile: client.mobile ?? '',
        email: client.email ?? '',
        secondaryEmail: client.secondaryEmail ?? '',
        note: client.note ?? '',
        lat: client.lat ?? '',
        lng: client.lng ?? '',
      })
    } else {
      setForm(initialForm)
    }
  }, [open, isEdit, client])

  if (!open) return null

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function useDeviceLocation() {
    if (!navigator.geolocation) {
      setMessage('Geolocalizzazione non disponibile su questo dispositivo.')
      return
    }

    setLocating(true)
    setMessage('Cerco posizione dispositivo...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((current) => ({
          ...current,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
        }))
        setMessage('Posizione dispositivo inserita.')
        setLocating(false)
      },
      (error) => {
        setMessage(`Posizione non concessa: ${error.message}`)
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    const googleMapsUrl = buildMapsUrl(form)
    const displayName = form.companyName || `${form.firstName} ${form.lastName}`.trim()

    try {
      const payload = {
        ...form,
        name: displayName,
        city: form.location,
        googleMapsUrl,
        createdFrom: 'quick-dashboard-popup',
      }

      if (isEdit) {
        await updateClient(client.id, payload)
        setMessage('Cliente modificato su Firebase.')
      } else {
        await saveClient(payload)
        setMessage('Cliente salvato su Firebase.')
        setForm(initialForm)
      }
    } catch (error) {
      setMessage(`Errore: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const googleMapsUrl = buildMapsUrl(form)

  async function handleDelete() {
    if (!isEdit) return

    if (deleteStep === 0) {
      setDeleteStep(1)
      setMessage('Conferma 1/2: premi ancora elimina per continuare.')
      return
    }

    if (deleteStep === 1) {
      setDeleteStep(2)
      setMessage('Conferma 2/2: ultimo click elimina definitivamente il cliente.')
      return
    }

    setSaving(true)
    try {
      await deleteClient(client.id)
      setMessage('Cliente eliminato definitivamente.')
      onClose()
    } catch (error) {
      setMessage(`Errore eliminazione: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="quick-modal" role="dialog" aria-modal="true" aria-labelledby="quick-client-title">
        <div className="modal-header">
          <div>
            <span>{isEdit ? 'Modifica cliente' : 'Aggiunta veloce'}</span>
            <h2 id="quick-client-title">{isEdit ? 'Modifica o elimina cliente' : 'Nuovo cliente'}</h2>
          </div>
          <button className="ghost-button" type="button" onClick={onClose}>Chiudi</button>
        </div>

        <form onSubmit={handleSubmit} className="quick-form">
          <div className="form-grid">
            <input placeholder="Nome" value={form.firstName} onChange={(event) => updateField('firstName', event.target.value)} />
            <input placeholder="Cognome" value={form.lastName} onChange={(event) => updateField('lastName', event.target.value)} />
            <input required placeholder="Nome azienda" value={form.companyName} onChange={(event) => updateField('companyName', event.target.value)} />
            <input required placeholder="Località" value={form.location} onChange={(event) => updateField('location', event.target.value)} />
            <select value={form.type} onChange={(event) => updateField('type', event.target.value)}>
              {customerTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
            <select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <input placeholder="Telefono" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
            <input placeholder="Cellulare" value={form.mobile} onChange={(event) => updateField('mobile', event.target.value)} />
            <input type="email" placeholder="Email aziendale" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
            <input type="email" placeholder="Seconda email" value={form.secondaryEmail} onChange={(event) => updateField('secondaryEmail', event.target.value)} />
            <input type="number" step="any" placeholder="Latitudine" value={form.lat} onChange={(event) => updateField('lat', event.target.value)} />
            <input type="number" step="any" placeholder="Longitudine" value={form.lng} onChange={(event) => updateField('lng', event.target.value)} />
          </div>

          <textarea placeholder="Nota veloce" value={form.note} onChange={(event) => updateField('note', event.target.value)} />

          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={useDeviceLocation} disabled={locating}>
              {locating ? 'Localizzo...' : 'Usa posizione dispositivo'}
            </button>
            {googleMapsUrl && <a className="maps-link" href={googleMapsUrl} target="_blank" rel="noreferrer">Apri match Google Maps</a>}
            {isEdit && (
              <button className="danger-button" type="button" onClick={handleDelete} disabled={saving}>
                {deleteStep === 0 ? 'Elimina' : deleteStep === 1 ? 'Conferma elimina 1/2' : 'Conferma elimina 2/2'}
              </button>
            )}
            <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Salvo...' : isEdit ? 'Salva modifiche' : 'Salva cliente'}</button>
          </div>

          {message && <p className="demo-note">{message}</p>}
        </form>
      </section>
    </div>
  )
}