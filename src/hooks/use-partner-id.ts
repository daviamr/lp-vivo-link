import { useEffect, useState } from "react"
import { getOrderSession } from "@/lib/order-storage"

export function usePartnerId() {
  const [partnerId, setPartnerId] = useState<number | null>(
    () => getOrderSession()?.partnerId ?? null,
  )

  useEffect(() => {
    const session = getOrderSession()
    if (session?.partnerId != null) {
      setPartnerId(session.partnerId)
      return
    }

    const interval = setInterval(() => {
      const currentSession = getOrderSession()
      if (currentSession?.partnerId != null) {
        setPartnerId(currentSession.partnerId)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return partnerId
}
