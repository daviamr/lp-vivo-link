import type { Extras, ProductExtraGroup, ProductExtras } from "@/types/extras"

export function getNonClientGroups(extras: ProductExtras | undefined): ProductExtraGroup[] {
  return extras?.non_client ?? []
}

export function flattenExtraOptions(groups: ProductExtraGroup[]) {
  return groups.flatMap((group) => group.options)
}

export function getSelectedExtraOptions(extraIds: string[], extras: ProductExtras | undefined) {
  return flattenExtraOptions(getNonClientGroups(extras)).filter((option) =>
    extraIds.includes(option.id),
  )
}

export function toLegacyExtra(option: { id: string; label: string; price: number }): Extras {
  return {
    id: option.id,
    extra: option.label,
    price: option.price,
  }
}
