import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

export const collections = {
  clients: 'clients',
  visits: 'visits',
  orders: 'orders',
}

export async function getCollection(collectionName) {
  if (!db) return []

  const ref = collection(db, collectionName)
  const snapshot = await getDocs(query(ref, orderBy('createdAt', 'desc')))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export function saveClient(client) {
  if (!db) return Promise.resolve({ id: 'demo-client', ...client })

  return addDoc(collection(db, collections.clients), {
    ...client,
    createdAt: serverTimestamp(),
  })
}

export function saveVisit(visit) {
  if (!db) return Promise.resolve({ id: 'demo-visit', ...visit })

  return addDoc(collection(db, collections.visits), {
    ...visit,
    createdAt: serverTimestamp(),
  })
}

export function saveOrder(order) {
  if (!db) return Promise.resolve({ id: 'demo-order', ...order })

  return addDoc(collection(db, collections.orders), {
    ...order,
    createdAt: serverTimestamp(),
  })
}