import { z } from "zod"

export const thirdStepSchema = z
  .object({
    cep: z
      .string()
      .trim()
      .refine((value) => value.replace(/\D/g, "").length === 8, "Informe um CEP válido"),
    number: z.string().trim().min(1, "Informe o número"),
    informQuadraLote: z.boolean().default(false),
    quadra: z.string().trim().optional(),
    lote: z.string().trim().optional(),
    address: z.string().trim().min(1, "Informe o endereço"),
    neighborhood: z.string().trim().min(1, "Informe o bairro"),
    city: z.string().trim().min(1, "Informe a cidade"),
    state: z
      .string()
      .trim()
      .length(2, "Informe a UF válida"),
    dwellingType: z.enum(["building", "house"]).default("house"),
    complement: z.string().trim().optional(),
    referencePoint: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.informQuadraLote) {
      if (!data.quadra?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Informe a quadra",
          path: ["quadra"],
        })
      }

      if (!data.lote?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Informe o lote",
          path: ["lote"],
        })
      }
    }
  })

export type ThirdStepFormData = z.infer<typeof thirdStepSchema>

export function getThirdStepFieldErrors(
  error: z.ZodError<ThirdStepFormData>,
): Partial<Record<keyof ThirdStepFormData, string>> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path[0], issue.message]),
  ) as Partial<Record<keyof ThirdStepFormData, string>>
}
