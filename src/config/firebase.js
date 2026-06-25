import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'AIzaSyDN4Krqci-4nCRvA9t2C8y8ou6tpLypNTQ',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'gesko-spa.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL ?? 'https://gesko-spa-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'gesko-spa',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'gesko-spa.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '746546282378',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '1:746546282378:web:d5b8894071e7455c151273',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? 'G-VV249P7W78',
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId,
)

export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null
export const auth = app ? getAuth(app) : null
export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('https://www.googleapis.com/auth/calendar.readonly')
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const realtimeDb = app ? getDatabase(app) : null