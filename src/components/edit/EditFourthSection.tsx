import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { PhoneInput } from "../ui/phone-input/PhoneInput"

export type EditFourthSectionFormData = {
  phone2: string
  termsOfUse: boolean
  communication: boolean
}

type Props = {
  form: EditFourthSectionFormData
  onChange: (field: keyof EditFourthSectionFormData, value: string | boolean) => void
  errors?: Partial<Record<keyof EditFourthSectionFormData, string>>
}

export default function EditFourthSection({ form, onChange, errors = {} }: Props) {
  return (
    <div className="grid gap-4 my-4 sm:grid-cols-2">
      <div className="md:col-span-3">
        <Label htmlFor="edit-phone2" className="text-[16px] mb-2">Segundo número de contato (Opcional)</Label>
        <PhoneInput
          id="edit-phone2"
          value={form.phone2}
          onChange={(phone2) => onChange("phone2", phone2)}
          aria-invalid={Boolean(errors.phone2)}
        />
        {errors.phone2 && (
          <p className="text-xs text-red-600 mt-1">{errors.phone2}</p>
        )}
      </div>

      <div className="md:col-span-6">
        <Label htmlFor="edit-termsOfUse" className="text-[16px] mb-2">
          <Checkbox
            id="edit-termsOfUse"
            className="rounded-full"
            checked={form.termsOfUse}
            onCheckedChange={(checked) => {
              onChange("termsOfUse", checked === "indeterminate" ? false : checked)
            }}
          />
          Aceito os <a href="#" className="underline">Termos e Condições de Uso.</a>
        </Label>
        {errors.termsOfUse && (
          <p className="text-xs text-red-600 mt-1">{errors.termsOfUse}</p>
        )}
      </div>

      <div className="md:col-span-6">
        <Label htmlFor="edit-communication" className="text-[16px] mb-2">
          <Checkbox
            id="edit-communication"
            className="rounded-full"
            checked={form.communication}
            onCheckedChange={(checked) => {
              onChange("communication", checked === "indeterminate" ? false : checked)
            }}
          />
          Aceito receber comunicações e ofertas da Vivo e Parceiros.
        </Label>
      </div>
    </div>
  )
}
