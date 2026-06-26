import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '▦' },
  { to: '/clienti', label: 'Clienti', icon: '◎' },
  { to: '/mappa', label: 'Mappa', icon: '⌖' },
  { to: '/agenda', label: 'Agenda', icon: '◷' },
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
              <span aria-hidden="true">{item.icon}</span>
              <b>{item.label}</b>
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