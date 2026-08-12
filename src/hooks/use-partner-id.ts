import { useEffect, useState } from "react"
import { getOrderSession } from "@/lib/order-storage"

type PartnerSession = {
  partnerId: number | null
  partnerName: string | null
  partnerLogoUrl: string | null
}

function readPartnerSession(): PartnerSession {
  const session = getOrderSession()
  return {
    partnerId: session?.partnerId ?? null,
    partnerName: session?.partnerName ?? null,
    partnerLogoUrl: session?.partnerLogoUrl ?? null,
  }
}

export function usePartner() {
  const [partner, setPartner] = useState<PartnerSession>(readPartnerSession)

  useEffect(() => {
    const current = readPartnerSession()
    if (current.partnerId != null) {
      setPartner(current)
      return
    }

    const interval = setInterval(() => {
      const next = readPartnerSession()
      if (next.partnerId != null) {
        setPartner(next)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return partner
}

export function usePartnerId() {
  return usePartner().partnerId
}
