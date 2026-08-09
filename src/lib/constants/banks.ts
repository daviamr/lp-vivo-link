export const bankOptions = [
  { value: "banco-do-brasil", label: "001 - Banco do Brasil", apiName: "Banco do Brasil" },
  { value: "bradesco", label: "237 - Bradesco", apiName: "Bradesco" },
  { value: "caixa", label: "104 - Caixa Econômica Federal", apiName: "Caixa Econômica Federal" },
  { value: "itau", label: "341 - Itaú", apiName: "Itaú" },
  { value: "santander", label: "033 - Santander", apiName: "Santander" },
  { value: "nubank", label: "260 - Nubank", apiName: "Nubank" },
  { value: "inter", label: "077 - Inter", apiName: "Inter" },
  { value: "sicoob", label: "756 - Sicoob", apiName: "Sicoob" },
  { value: "sicredi", label: "748 - Sicredi", apiName: "Sicredi" },
  { value: "banrisul", label: "041 - Banrisul", apiName: "Banrisul" },
  { value: "original", label: "212 - Banco Original", apiName: "Banco Original" },
  { value: "c6", label: "336 - C6 Bank", apiName: "C6 Bank" },
  { value: "bs2", label: "218 - BS2", apiName: "BS2" },
  { value: "modal", label: "746 - Banco Modal", apiName: "Banco Modal" },
  { value: "safra", label: "422 - Banco Safra", apiName: "Banco Safra" },
  { value: "bmg", label: "318 - Banco BMG", apiName: "Banco BMG" },
  { value: "pan", label: "623 - Banco Pan", apiName: "Banco Pan" },
  { value: "btg", label: "208 - BTG Pactual", apiName: "BTG Pactual" },
  { value: "mercado-pago", label: "323 - Mercado Pago", apiName: "Mercado Pago" },
  { value: "picpay", label: "380 - PicPay", apiName: "PicPay" },
] as const

export type BankValue = (typeof bankOptions)[number]["value"]
