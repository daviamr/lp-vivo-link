import { api } from "@/lib/api/client"
import type {
  CloseOrderPayload,
  CreateOrderPayload,
  CreateOrderResponse,
  SecondCallResponse,
  UpdateOrderPayload,
} from "@/types/order"

export type SecondCallUpdateData = {
  full_name?: string
  cpf?: string
  birth_date?: string
  mother_full_name?: string
  phone?: string
  email?: string
  rg?: {
    number: string
    issuingAuthority: string
    issueDate: string
  }
  zip_code?: string
  address?: string
  address_number?: string
  district?: string
  city?: string
  state?: string
  address_complement?: Record<string, unknown>
  due_day?: string
  payment_method?: string
  bank_name?: string
  bank_branch?: string
  bank_account_number?: string
  bank_account_holder_name?: string
  bank_account_holder_cpf?: string
  installation_preferred_date_one?: string
  installation_preferred_period_one?: string
  installation_preferred_date_two?: string
  installation_preferred_period_two?: string
  installation_preferred_date_three?: string
  installation_preferred_period_three?: string
  additional_phone?: string
  terms_accepted?: boolean
  accept_offers?: boolean
}

export async function getOrderByToken(token: string) {
  const { data } = await api.get<SecondCallResponse>(`/telecom/vivo/orders/second-call?token=${token}`)
  return data
}

export async function createOrder(payload: CreateOrderPayload) {
  const { data } = await api.post<CreateOrderResponse>("/telecom/vivo/orders", payload)
  return data
}

export async function updateOrder(
  orderId: number,
  orderToken: string,
  payload: UpdateOrderPayload,
) {
  const { data } = await api.put(`/telecom/vivo/orders/${orderId}`, payload, {
    headers: {
      Authorization: `Bearer ${orderToken}`,
    },
  })

  return data
}

export async function updateSecondCall(token: string, data: SecondCallUpdateData) {
  const { data: responseData } = await api.put("/telecom/vivo/orders/second-call", { token, data })
  return responseData
}

export async function closeOrder(orderId: number, orderToken: string) {
  const payload: CloseOrderPayload = {
    status: "FECHADO",
  }

  const { data } = await api.patch(
    `/telecom/vivo/orders/${orderId}/status`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${orderToken}`,
      },
    },
  )

  return data
}
