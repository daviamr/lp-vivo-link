import { touchFlowTimestamp } from "@/lib/storage-expiry"
import type { PartnerData } from "@/types/order"

const ORDER_SESSION_KEY = "vivo-order-session"

export type OrderSession = {
  orderId: number
  orderToken: string
  expiresAt?: string
  partnerId: number | null
  partnerName: string | null
  partnerLogoUrl: string | null
}

export function saveOrderSession(session: OrderSession) {
  localStorage.setItem(ORDER_SESSION_KEY, JSON.stringify(session))
  touchFlowTimestamp()
}

export function getOrderSession(): OrderSession | null {
  const raw = localStorage.getItem(ORDER_SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as OrderSession
  } catch {
    return null
  }
}

export function savePartnerData(partner: PartnerData | null) {
  const session = getOrderSession()
  if (!session) return

  saveOrderSession({
    ...session,
    partnerId: partner?.partner_id ?? null,
    partnerName: partner?.partner_name ?? null,
    partnerLogoUrl: partner?.logo_url ?? null,
  })
}

export function clearOrderSession() {
  localStorage.removeItem(ORDER_SESSION_KEY)
}
