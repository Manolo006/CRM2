import ClientsTable from '../components/clients/ClientsTable'
import { demoClients } from '../data/mockData'
import { saveClient } from '../services/firestore'

export default function ClientsPage() {
  async function handleDemoSave() {
    await saveClient({
      name: 'Nuovo cliente demo',
      city: 'Lecco',
      type: 'Cartoleria',
      status: 'Prospect',
      lat: 45.8566,
      lng: 9.3977,
    })
    alert('Cliente demo salvato su Firestore')
  }

  return (
    <>
      <header className="page-header row-header">
        <div>
          <span>Archivio</span>
          <h1>Clienti</h1>
          <p>Filtra e consulta scuole, cartolerie e grossisti.</p>
        </div>
        <button className="primary-button" type="button" onClick={handleDemoSave}>Salva demo Firestore</button>
      </header>
      <ClientsTable clients={demoClients} />
    </>
  )
}