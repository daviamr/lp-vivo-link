export function parsePrice(price: string | number) {
  if (typeof price === "number") {
    return price
  }

  return Number(price.replace(/\./g, "").replace(",", "."))
}

export function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
