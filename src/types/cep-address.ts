export type CepAddressData = {
  searchFor: "house" | "business"
  cep: string
  number: string
  noNumber: boolean
  address: string
  neighborhood: string
  city: string
  state: string
  dwellingType: "building" | "house"
  complement?: string
  buildingType?: string
  buildingComplement?: string
  buildingFloor?: string
  buildingBlock?: string
}
