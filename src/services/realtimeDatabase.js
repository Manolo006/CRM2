import { get, onValue, push, ref, remove, set, update } from 'firebase/database'
import { realtimeDb } from '../config/firebase'

export const paths = {
  clients: 'clients',
  visits: 'visits',
  orders: 'orders',
}

export function subscribeList(pathName, callback) {
  if (!realtimeDb) {
    callback([])
    return () => {}
  }

  return onValue(ref(realtimeDb, pathName), (snapshot) => {
    if (!snapshot.exists()) {
      callback([])
      return
    }

    const items = Object.entries(snapshot.val()).map(([id, value]) => ({ id, ...value }))
    callback(items)
  })
}

export async function getList(pathName) {
  if (!realtimeDb) return []

  const snapshot = await get(ref(realtimeDb, pathName))
  if (!snapshot.exists()) return []

  return Object.entries(snapshot.val()).map(([id, value]) => ({ id, ...value }))
}

async function saveItem(pathName, item) {
  if (!realtimeDb) return { id: `demo-${pathName}`, ...item }

  const itemRef = push(ref(realtimeDb, pathName))
  const payload = {
    ...item,
    createdAt: new Date().toISOString(),
  }

  await set(itemRef, payload)
  return { id: itemRef.key, ...payload }
}

export function saveClient(client) {
  return saveItem(paths.clients, {
    ...client,
    lat: Number(client.lat),
    lng: Number(client.lng),
  })
}

export async function updateClient(clientId, client) {
  if (!realtimeDb) return { id: clientId, ...client }

  const payload = {
    ...client,
    lat: Number(client.lat),
    lng: Number(client.lng),
    updatedAt: new Date().toISOString(),
  }

  await update(ref(realtimeDb, `${paths.clients}/${clientId}`), payload)
  return { id: clientId, ...payload }
}

export async function deleteClient(clientId) {
  if (!realtimeDb) return true

  await remove(ref(realtimeDb, `${paths.clients}/${clientId}`))
  return true
}

export function saveVisit(visit) {
  return saveItem(paths.visits, visit)
}

export function saveOrder(order) {
  return saveItem(paths.orders, order)
}