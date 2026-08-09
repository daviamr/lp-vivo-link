import { z } from "zod"

export const secondStepSchema = z.object({
  extraIds: z.array(z.string()),
})

export type SecondStepFormData = z.infer<typeof secondStepSchema>

export type SecondStepFormInput = {
  extraIds: string[]
}

export function getSecondStepFieldErrors(
  error: z.ZodError<SecondStepFormData>,
): Partial<Record<keyof SecondStepFormData, string>> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path[0], issue.message]),
  ) as Partial<Record<keyof SecondStepFormData, string>>
}
