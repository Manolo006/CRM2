import { useState } from 'react'
import { saveClient } from '../../services/realtimeDatabase'

const initialForm = {
  name: '',
  city: '',
  type: 'Cartoleria',
  status: 'Attivo',
  lat: '',
  lng: '',
}

export default function ClientLocationForm() {
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      await saveClient({
        ...form,
        lastVisit: '',
      })
      setForm(initialForm)
      setMessage('Location salvata su Firebase Realtime Database.')
    } catch (error) {
      setMessage(`Errore salvataggio: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="panel location-form" onSubmit={handleSubmit}>
      <div className="section-heading">
        <h2>Aggiungi location cliente</h2>
        <p>Inserisci coordinate GPS e salva su Firebase Realtime Database.</p>
      </div>
      <div className="form-grid">
        <input required placeholder="Nome cliente" value={form.name} onChange={(event) => updateField('name', event.target.value)} />
        <input required placeholder="Città" value={form.city} onChange={(event) => updateField('city', event.target.value)} />
        <select value={form.type} onChange={(event) => updateField('type', event.target.value)}>
          <option>Cartoleria</option>
          <option>Scuola</option>
          <option>Grossista</option>
          <option>Prospect</option>
        </select>
        <select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
          <option>Attivo</option>
          <option>Da visitare</option>
          <option>Prospect</option>
        </select>
        <input required type="number" step="any" placeholder="Latitudine es. 45.4642" value={form.lat} onChange={(event) => updateField('lat', event.target.value)} />
        <input required type="number" step="any" placeholder="Longitudine es. 9.1900" value={form.lng} onChange={(event) => updateField('lng', event.target.value)} />
      </div>
      <button className="primary-button" type="submit" disabled={saving}>
        {saving ? 'Salvataggio...' : 'Aggiungi location su Firebase'}
      </button>
      {message && <p className="demo-note">{message}</p>}
    </form>
  )
}