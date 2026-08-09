import { touchFlowTimestamp } from "@/lib/storage-expiry"
import type {
  CheckoutData,
  CheckoutFirstStep,
  CheckoutFifthStep,
  CheckoutFourthStep,
  CheckoutSecondStep,
  CheckoutThirdStep,
} from "@/types/checkout"

const CHECKOUT_STORAGE_KEY = "vivo-checkout"

function getCheckoutData(): CheckoutData {
  const raw = localStorage.getItem(CHECKOUT_STORAGE_KEY)
  if (!raw) return {}

  try {
    return JSON.parse(raw) as CheckoutData
  } catch {
    return {}
  }
}

function saveCheckoutData(data: CheckoutData) {
  localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(data))
  touchFlowTimestamp()
}

export function saveFirstStep(firstStep: CheckoutFirstStep) {
  saveCheckoutData({ ...getCheckoutData(), firstStep })
}

export function getFirstStep(): CheckoutFirstStep | null {
  return getCheckoutData().firstStep ?? null
}

export function saveSecondStep(secondStep: CheckoutSecondStep) {
  saveCheckoutData({ ...getCheckoutData(), secondStep })
}

export function getSecondStep(): CheckoutSecondStep | null {
  return getCheckoutData().secondStep ?? null
}

export function saveThirdStep(thirdStep: CheckoutThirdStep) {
  saveCheckoutData({ ...getCheckoutData(), thirdStep })
}

export function getThirdStep(): CheckoutThirdStep | null {
  return getCheckoutData().thirdStep ?? null
}

export function saveFourthStep(fourthStep: CheckoutFourthStep) {
  saveCheckoutData({ ...getCheckoutData(), fourthStep })
}

export function getFourthStep(): CheckoutFourthStep | null {
  return getCheckoutData().fourthStep ?? null
}

export function saveFifthStep(fifthStep: CheckoutFifthStep) {
  saveCheckoutData({ ...getCheckoutData(), fifthStep })
}

export function getFifthStep(): CheckoutFifthStep | null {
  return getCheckoutData().fifthStep ?? null
}

export function saveOrderNumber(orderNumber: string) {
  saveCheckoutData({ ...getCheckoutData(), orderNumber })
}

export function getOrderNumber(): string | null {
  return getCheckoutData().orderNumber ?? null
}

export function clearCheckoutData() {
  localStorage.removeItem(CHECKOUT_STORAGE_KEY)
}
