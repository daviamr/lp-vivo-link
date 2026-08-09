import { z } from "zod"
import type { CepAddressData } from "@/types/cep-address"

export const cepModalSchema = z
  .object({
    searchFor: z.enum(["house", "business"]),
    cep: z
      .string()
      .trim()
      .refine((value) => value.replace(/\D/g, "").length === 8, "Informe um CEP válido"),
    number: z.string().trim(),
    noNumber: z.boolean(),
    address: z.string().trim().min(1, "Informe o endereço"),
    neighborhood: z.string().trim().min(1, "Informe o bairro"),
    city: z.string().trim().min(1, "Informe a cidade"),
    state: z
      .string()
      .trim()
      .length(2, "Informe a UF válida"),
    dwellingType: z.enum(["building", "house"]),
    complement: z.string().trim().optional(),
    buildingType: z.string().trim().optional(),
    buildingComplement: z.string().trim().optional(),
    buildingFloor: z.string().trim().optional(),
    buildingBlock: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.noNumber && !data.number.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Informe o número",
        path: ["number"],
      })
    }
  })

export type CepModalFormData = z.infer<typeof cepModalSchema>

export function getCepModalFieldErrors(
  error: z.ZodError<CepModalFormData>,
): Partial<Record<keyof CepAddressData, string>> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path[0], issue.message]),
  ) as Partial<Record<keyof CepAddressData, string>>
}
