import { isValidPhoneNumber } from "@/lib/phone"
import { z } from "zod"

function toStringValue(value: unknown) {
  return value == null ? "" : String(value)
}

function toOptionalString(value: unknown) {
  if (value == null || value === "") {
    return undefined
  }

  return String(value)
}

export const fifthStepSchema = z.object({
  phone: z.preprocess(
    toStringValue,
    z.string().trim().refine(isValidPhoneNumber, "Informe um telefone válido"),
  ),
  phone2: z.preprocess(
    toOptionalString,
    z
      .string()
      .trim()
      .refine(isValidPhoneNumber, "Informe um telefone válido")
      .optional(),
  ),
  termsOfUse: z.boolean().refine((value) => value, "Aceite os termos e condições de uso"),
  communication: z.boolean(),
})

export type FifthStepFormData = z.infer<typeof fifthStepSchema>

export type FifthStepFormInput = {
  phone: string
  phone2: string
  termsOfUse: boolean
  communication: boolean
}

export function getFifthStepFieldErrors(
  error: z.ZodError<FifthStepFormData>,
): Partial<Record<keyof FifthStepFormData, string>> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path[0], issue.message]),
  ) as Partial<Record<keyof FifthStepFormData, string>>
}
