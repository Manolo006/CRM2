import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import AgendaPage from './pages/AgendaPage'
import ClientsPage from './pages/ClientsPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import MapPage from './pages/MapPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="clienti" element={<ClientsPage />} />
        <Route path="mappa" element={<MapPage />} />
        <Route path="agenda" element={<AgendaPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
