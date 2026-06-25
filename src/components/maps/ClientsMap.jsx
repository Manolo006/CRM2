import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export default function ClientsMap({ clients }) {
  const validClients = clients.filter((client) => Number.isFinite(Number(client.lat)) && Number.isFinite(Number(client.lng)))

  return (
    <MapContainer className="clients-map" center={[45.55, 9.45]} zoom={8} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validClients.map((client) => (
        <Marker key={client.id} position={[Number(client.lat), Number(client.lng)]} icon={markerIcon}>
          <Popup>
            <strong>{client.name}</strong><br />
            {client.city} · {client.type}<br />
            Stato: {client.status}<br />
            {client.googleMapsUrl && <a href={client.googleMapsUrl} target="_blank" rel="noreferrer">Apri in Google Maps</a>}
          </Popup>
        </Marker>
      ))}
      {validClients.length === 0 && (
        <Popup position={[45.55, 9.45]}>Nessuna location salvata. Aggiungine una dal form.</Popup>
      )}
    </MapContainer>
  )
}