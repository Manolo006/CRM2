import { useEffect, useState } from 'react'
import { subscribeList } from '../services/realtimeDatabase'

export function useRealtimeList(pathName) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const unsubscribe = subscribeList(pathName, (values) => {
      setItems(values)
      setLoading(false)
    })

    return unsubscribe
  }, [pathName])

  return { items, loading }
}