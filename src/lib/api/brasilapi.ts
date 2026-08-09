export type BrasilApiCnpjResponse = {
  razao_social: string
}

export async function fetchCnpjInfo(cnpjDigits: string): Promise<BrasilApiCnpjResponse | null> {
  if (cnpjDigits.length !== 14) {
    return null
  }

  const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjDigits}`)

  if (!response.ok) {
    return null
  }

  return response.json() as Promise<BrasilApiCnpjResponse>
}
