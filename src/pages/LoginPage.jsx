import { Navigate } from 'react-router-dom'
import GoogleLogin from '../components/auth/GoogleLogin'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { user } = useAuth()

  if (user) return <Navigate to="/" replace />

  return (
    <main className="login-page">
      <GoogleLogin />
    </main>
  )
}