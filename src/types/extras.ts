export type ProductExtraOption = {
  id: string
  label: string
  price: number
  description?: string
}

export type ProductExtraGroup = {
  id: string
  label: string
  images: string[]
  options: ProductExtraOption[]
  input_type: "checkbox_group" | "radio",
  description?: string
}

export type ProductExtras = {
  client: ProductExtraGroup[]
  non_client: ProductExtraGroup[]
}

export type Extras = {
  id: string
  extra: string
  price: string | number
}
