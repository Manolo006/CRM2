import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/clienti', label: 'Clienti' },
  { to: '/mappa', label: 'Mappa' },
  { to: '/agenda', label: 'Agenda' },
]

export default function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand-badge">CRM Scuola</div>
          <h2>Rappresentanti</h2>
        </div>
        <nav className="main-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="user-box">
          <span>{user?.displayName ?? 'Agente'}</span>
          <button type="button" onClick={logout}>Esci</button>
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}