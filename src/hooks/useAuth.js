import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react'
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase'

const isAccountAccessDisabled = true

const demoUser = {
  displayName: 'Agente Demo',
  email: 'demo@crm-scuola.it',
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(isAccountAccessDisabled || !isFirebaseConfigured ? demoUser : null)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(!isAccountAccessDisabled && isFirebaseConfigured)

  useEffect(() => {
    if (isAccountAccessDisabled || !auth) return undefined

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  async function loginWithGoogle() {
    if (isAccountAccessDisabled || !auth) {
      setUser(demoUser)
      return
    }

    const result = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    setAccessToken(credential?.accessToken ?? null)
    setUser(result.user)
  }

  function logout() {
    setAccessToken(null)
    if (isAccountAccessDisabled || !auth) {
      setUser(demoUser)
      return Promise.resolve()
    }

    return signOut(auth)
  }

  const value = useMemo(() => ({
    user,
    accessToken,
    loading,
    loginWithGoogle,
    logout,
    isFirebaseConfigured: !isAccountAccessDisabled && isFirebaseConfigured,
    isAccountAccessDisabled,
  }), [user, accessToken, loading])

  return createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve essere usato dentro AuthProvider')
  return context
}