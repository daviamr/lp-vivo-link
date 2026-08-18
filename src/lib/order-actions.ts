import { closeOrder, updateOrder } from "@/lib/api/orders"
import { VIVO_CATEGORY, VIVO_LANDING_PAGE } from "@/lib/constants/vivo"
import { getOrderSession } from "@/lib/order-storage"
import type { UpdateOrderPayload } from "@/types/order"

export async function tryUpdateOrder(payload: UpdateOrderPayload) {
  const session = getOrderSession()
  if (!session) {
    return null
  }

  return updateOrder(session.orderId, session.orderToken, {
    ...payload,
    category: VIVO_CATEGORY,
    landing_page: VIVO_LANDING_PAGE,
  })
}

export async function tryCloseOrder() {
  const session = getOrderSession()
  if (!session) {
    return null
  }

  return closeOrder(session.orderId, session.orderToken)
}
