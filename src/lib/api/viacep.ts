import axios from "axios"

export type ViaCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

const viacepApi = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: 10_000,
})

export async function fetchAddressByCep(cep: string): Promise<ViaCepResponse> {
  const sanitizedCep = cep.replace(/\D/g, "")

  if (sanitizedCep.length !== 8) {
    throw new Error("CEP inválido")
  }

  const { data } = await viacepApi.get<ViaCepResponse>(`/${sanitizedCep}/json/`)

  if (data.erro) {
    throw new Error("CEP não encontrado")
  }

  return data
}
