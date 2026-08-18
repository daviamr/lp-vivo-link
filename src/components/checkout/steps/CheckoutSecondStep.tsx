import { useStep } from "@/contexts/step/StepContext"
import { stepTitleAndDescription } from "./shared/StepUtils"
import { useEffect, useState } from "react"
import { getSecondStep, saveSecondStep } from "@/lib/checkout-storage"
import { tryUpdateOrder } from "@/lib/order-actions"
import { mapSecondStepUpdate } from "@/lib/order-mappers"
import { getPlan } from "@/lib/plan-storage"
import { trackCheckoutStep } from "@/lib/gtm"
import {
  secondStepSchema,
  type SecondStepFormInput,
} from "@/schemas/checkout/second-step.schema"
import ExtrasCard from "@/components/card/extras-card/ExtrasCard"
import { Button } from "@/components/ui/button"
import { getNonClientGroups } from "@/lib/extras"

const initialForm: SecondStepFormInput = {
  extraIds: [],
}

type CheckoutSecondStepProps = {
  onExtraIdsChange?: (ids: string[]) => void
}

export default function CheckoutSecondStep({ onExtraIdsChange }: CheckoutSecondStepProps) {
  const { step, nextStep } = useStep()
  const title = stepTitleAndDescription[step].title
  const description = stepTitleAndDescription[step].description

  const [form, setForm] = useState<SecondStepFormInput>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const plan = getPlan()
  const extraGroups = getNonClientGroups(plan?.extras)

  useEffect(() => {
    const saved = getSecondStep()
    if (saved) {
      setForm({ ...initialForm, ...saved })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = secondStepSchema.safeParse(form)
    if (!result.success) {
      return
    }

    setIsSubmitting(true)

    try {
      saveSecondStep(result.data)

      const plan = getPlan()
      await tryUpdateOrder(
        mapSecondStepUpdate(
          result.data,
          plan?.monthlyPrice ?? 0,
          plan?.originalMonthlyPrice,
          plan?.extras,
        ),
      )
      trackCheckoutStep(2)

      nextStep()
    } catch {
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="text-[#3F3F3F]">
      <h1 className="text-lg leading-snug break-words md:text-2xl">{title}</h1>
      <p className="text-base font-bold md:text-[20px]">{description}</p>

      <form onSubmit={handleSubmit} noValidate>
        <ExtrasCard
          groups={extraGroups}
          selectedIds={form.extraIds}
          onChange={(extraIds) => {
            setForm((current) => ({ ...current, extraIds }))
            onExtraIdsChange?.(extraIds)
          }}
        />

        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-[18px] font-bold bg-[#E73871] rounded-full py-[28px] px-18 mt-8 duration-300 cursor-pointer hover:bg-[#E73871]/80 disabled:opacity-60">
            {isSubmitting ? "Enviando..." : "Avançar"}
          </Button>
        </div>
      </form>
    </div>
  )
}
