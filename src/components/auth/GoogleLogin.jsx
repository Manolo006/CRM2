import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function GoogleLogin() {
  const { loginWithGoogle, isFirebaseConfigured } = useAuth()
  const [error, setError] = useState('')

  async function handleLogin() {
    try {
      setError('')
      await loginWithGoogle()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="login-card">
      <div className="brand-badge">CRM Scuola</div>
      <h1>Accesso rappresentanti</h1>
      <p>Gestisci clienti, visite, ordini e agenda Google per articoli scolastici.</p>
      {!isFirebaseConfigured && (
        <p className="demo-note">Modalità demo attiva: aggiungi `.env` per Firebase reale.</p>
      )}
      {isFirebaseConfigured && (
        <p className="demo-note">Firebase configurato: il pulsante apre popup Google Auth.</p>
      )}
      <button className="primary-button" type="button" onClick={handleLogin}>
        {isFirebaseConfigured ? 'Accedi con Google' : 'Entra in demo'}
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}