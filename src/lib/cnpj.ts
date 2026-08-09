export function sanitizeCnpj(value: string) {
  return value.replace(/\D/g, "").slice(0, 14)
}
