import { saveThirdStep } from "@/lib/checkout-storage"
import { touchFlowTimestamp } from "@/lib/storage-expiry"
import type { CepAddressData } from "@/types/cep-address"
import type { CheckoutThirdStep } from "@/types/checkout"

const CEP_ADDRESS_STORAGE_KEY = "vivo-cep-address"

function getBuildingComplement(data: CepAddressData) {
  return [
    data.buildingType,
    data.buildingComplement,
    data.buildingFloor && `Andar ${data.buildingFloor}`,
    data.buildingBlock && `Bloco ${data.buildingBlock}`,
  ]
    .filter(Boolean)
    .join(", ")
}

export function toCheckoutThirdStep(data: CepAddressData): CheckoutThirdStep {
  return {
    cep: data.cep,
    number: data.noNumber ? "S/N" : data.number,
    informQuadraLote: false,
    address: data.address,
    neighborhood: data.neighborhood,
    city: data.city,
    state: data.state,
    dwellingType: data.dwellingType,
    complement:
      data.dwellingType === "house"
        ? data.complement?.trim() || undefined
        : getBuildingComplement(data) || undefined,
  }
}

export function saveCepAddress(data: CepAddressData) {
  localStorage.setItem(CEP_ADDRESS_STORAGE_KEY, JSON.stringify(data))
  saveThirdStep(toCheckoutThirdStep(data))
  touchFlowTimestamp()
}

export function getCepAddress(): CepAddressData | null {
  const raw = localStorage.getItem(CEP_ADDRESS_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as CepAddressData
  } catch {
    return null
  }
}

export function clearCepAddress() {
  localStorage.removeItem(CEP_ADDRESS_STORAGE_KEY)
}
