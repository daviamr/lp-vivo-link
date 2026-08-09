import { z } from "zod"
import { isValidCpf } from "@/lib/cpf"
import { isValidInstallationDate } from "@/components/checkout/steps/shared/StepUtils"
import { bankOptions } from "@/lib/constants/banks"

export const dueDayValues = ["1", "10", "17", "21", "26"] as const
export const paymentMethodValues = ["bankSlip", "debitAuto"] as const
export const bankValues = bankOptions.map((b) => b.value) as unknown as [string, ...string[]]
export const periodValues = ["morning", "afternoon"] as const

function toSelectString(value: unknown) {
  return value == null ? "" : String(value)
}

function toOptionalString(value: unknown) {
  if (value == null || value === "") {
    return undefined
  }

  return String(value)
}

function requiredSelect(message: string) {
  return z.preprocess(
    toSelectString,
    z.string().trim().min(1, message),
  )
}

function requiredInstallationDate() {
  return z.preprocess(
    toSelectString,
    z
      .string()
      .trim()
      .min(1, "Selecione a data")
      .refine(isValidInstallationDate, "Selecione uma data disponível"),
  )
}

export const fourthStepSchema = z
  .object({
    dueDay: requiredSelect("Selecione o dia de vencimento").refine(
      (value): value is (typeof dueDayValues)[number] =>
        dueDayValues.includes(value as (typeof dueDayValues)[number]),
      "Selecione o dia de vencimento",
    ),
    paymentMethod: requiredSelect("Selecione a forma de pagamento").refine(
      (value): value is (typeof paymentMethodValues)[number] =>
        paymentMethodValues.includes(value as (typeof paymentMethodValues)[number]),
      "Selecione a forma de pagamento",
    ),
    bank: z.preprocess(toOptionalString, z.string().trim().optional()),
    agency: z.preprocess(toOptionalString, z.string().trim().optional()),
    account: z.preprocess(toOptionalString, z.string().trim().optional()),
    bankAccountHolderName: z.preprocess(toOptionalString, z.string().trim().optional()),
    bankAccountHolderCpf: z.preprocess(toOptionalString, z.string().trim().optional()),
    firstOptionDate: requiredInstallationDate(),
    firstOptionPeriod: requiredSelect("Selecione o período").refine(
      (value): value is (typeof periodValues)[number] =>
        periodValues.includes(value as (typeof periodValues)[number]),
      "Selecione o período",
    ),
    secondOptionDate: requiredInstallationDate(),
    secondOptionPeriod: requiredSelect("Selecione o período").refine(
      (value): value is (typeof periodValues)[number] =>
        periodValues.includes(value as (typeof periodValues)[number]),
      "Selecione o período",
    ),
    thirdOptionDate: requiredInstallationDate(),
    thirdOptionPeriod: requiredSelect("Selecione o período").refine(
      (value): value is (typeof periodValues)[number] =>
        periodValues.includes(value as (typeof periodValues)[number]),
      "Selecione o período",
    ),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== "debitAuto") {
      return
    }

    if (!data.bank) {
      ctx.addIssue({
        code: "custom",
        message: "Selecione o banco",
        path: ["bank"],
      })
    }

    if (!data.agency?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Informe a agência",
        path: ["agency"],
      })
    }

    if (!data.account?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Informe a conta",
        path: ["account"],
      })
    }

    if (!data.bankAccountHolderName?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Informe o nome do titular da conta",
        path: ["bankAccountHolderName"],
      })
    }

    if (!data.bankAccountHolderCpf?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Informe o CPF do titular da conta",
        path: ["bankAccountHolderCpf"],
      })
    } else if (!isValidCpf(data.bankAccountHolderCpf)) {
      ctx.addIssue({
        code: "custom",
        message: "Informe um CPF válido",
        path: ["bankAccountHolderCpf"],
      })
    }
  })

export type FourthStepFormData = z.infer<typeof fourthStepSchema>

export type FourthStepFormInput = {
  dueDay: "" | FourthStepFormData["dueDay"]
  paymentMethod: "" | FourthStepFormData["paymentMethod"]
  bank?: string | ""
  agency?: string
  account?: string
  bankAccountHolderName?: string
  bankAccountHolderCpf?: string
  firstOptionDate: string
  firstOptionPeriod: "" | FourthStepFormData["firstOptionPeriod"]
  secondOptionDate: string
  secondOptionPeriod: "" | FourthStepFormData["secondOptionPeriod"]
  thirdOptionDate: string
  thirdOptionPeriod: "" | FourthStepFormData["thirdOptionPeriod"]
}

export function getFourthStepFieldErrors(
  error: z.ZodError<FourthStepFormData>,
): Partial<Record<keyof FourthStepFormData, string>> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path[0], issue.message]),
  ) as Partial<Record<keyof FourthStepFormData, string>>
}
