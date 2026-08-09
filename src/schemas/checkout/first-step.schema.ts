import { isValidCpf } from "@/lib/cpf"
import { isValidPhoneNumber } from "@/lib/phone"
import { z } from "zod"

export const firstStepSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo"),
  tel: z
    .string()
    .trim()
    .refine(isValidPhoneNumber, "Informe um celular válido"),
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido"),
  cnpj: z.string().trim().optional(),
  razaosocial: z.string().trim().optional(),
  cpf: z
    .string()
    .trim()
    .refine((val) => !val || isValidCpf(val), "Informe um CPF válido")
    .optional(),
  legalAuthorization: z.boolean().optional().default(false),
})

export type FirstStepFormData = z.infer<typeof firstStepSchema>

export function getFirstStepFieldErrors(error: z.ZodError<FirstStepFormData>): Partial<Record<keyof FirstStepFormData, string>> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path[0], issue.message]),
  ) as Partial<Record<keyof FirstStepFormData, string>>
}
