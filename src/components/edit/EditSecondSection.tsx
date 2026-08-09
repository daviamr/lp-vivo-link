import { fetchAddressByCep } from "@/lib/api/viacep"
import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

export type EditSecondSectionFormData = {
  cep: string
  number: string
  informQuadraLote: boolean
  quadra: string
  lote: string
  address: string
  neighborhood: string
  city: string
  state: string
  dwellingType: "building" | "house"
  complement: string
  referencePoint: string
}

type Props = {
  form: EditSecondSectionFormData
  onChange: (field: keyof EditSecondSectionFormData, value: string | boolean) => void
  errors?: Partial<Record<keyof EditSecondSectionFormData, string>>
}

function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

export default function EditSecondSection({ form, onChange, errors = {} }: Props) {
  const [isLoadingCep, setIsLoadingCep] = useState(false)

  const handleChange = (field: keyof EditSecondSectionFormData) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = field === "state"
      ? e.target.value.toUpperCase().slice(0, 2)
      : e.target.value
    onChange(field, value)
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange("cep", formatCep(e.target.value))
  }

  const handleCepBlur = async () => {
    const digits = form.cep.replace(/\D/g, "")
    if (digits.length !== 8) return

    setIsLoadingCep(true)
    try {
      const data = await fetchAddressByCep(form.cep)
      onChange("address", data.logradouro)
      onChange("neighborhood", data.bairro)
      onChange("city", data.localidade)
      onChange("state", data.uf)
    } catch {
      onChange("cep", form.cep)
    } finally {
      setIsLoadingCep(false)
    }
  }

  return (
    <div className="grid gap-4 my-4 sm:grid-cols-2">
        <div className="md:col-span-1">
          <Label htmlFor="edit-cep" className="text-[16px] mb-2">CEP</Label>
          <Input
            type="text"
            id="edit-cep"
            inputMode="numeric"
            placeholder="00000-000"
            className="rounded-sm py-5"
            value={form.cep}
            onChange={handleCepChange}
            onBlur={handleCepBlur}
            disabled={isLoadingCep}
            aria-invalid={Boolean(errors.cep)}
          />
          {errors.cep && (
            <p className="text-xs text-red-600 mt-1">{errors.cep}</p>
          )}
          <Label className="text-xs mt-2 flex items-center gap-2">
            <Checkbox
              id="edit-cep-checkbox"
              className="rounded-full"
              checked={form.informQuadraLote}
              onCheckedChange={(checked) => {
                const informQuadraLote = checked === "indeterminate" ? false : checked
                onChange("informQuadraLote", informQuadraLote)
                if (!informQuadraLote) {
                  onChange("quadra", "")
                  onChange("lote", "")
                }
              }}
            />
            Quero informar quadra e lote
          </Label>
        </div>

        <div className="md:col-span-1">
          <Label htmlFor="edit-number" className="text-[16px] mb-2">Número</Label>
          <Input
            type="text"
            id="edit-number"
            className="rounded-sm py-5"
            value={form.number}
            onChange={handleChange("number")}
            aria-invalid={Boolean(errors.number)}
          />
          {errors.number && (
            <p className="text-xs text-red-600 mt-1">{errors.number}</p>
          )}
        </div>

        {form.informQuadraLote && (
          <>
            <div className="md:col-span-1">
              <Label htmlFor="edit-quadra" className="text-[16px] mb-2">Quadra</Label>
              <Input
                type="text"
                id="edit-quadra"
                className="rounded-sm py-5"
                value={form.quadra}
                onChange={handleChange("quadra")}
                aria-invalid={Boolean(errors.quadra)}
              />
              {errors.quadra && (
                <p className="text-xs text-red-600 mt-1">{errors.quadra}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <Label htmlFor="edit-lote" className="text-[16px] mb-2">Lote</Label>
              <Input
                type="text"
                id="edit-lote"
                className="rounded-sm py-5"
                value={form.lote}
                onChange={handleChange("lote")}
                aria-invalid={Boolean(errors.lote)}
              />
              {errors.lote && (
                <p className="text-xs text-red-600 mt-1">{errors.lote}</p>
              )}
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <Label htmlFor="edit-address" className="text-[16px] mb-2">Endereço</Label>
          <Input
            type="text"
            id="edit-address"
            className="rounded-sm py-5"
            value={form.address}
            onChange={handleChange("address")}
            aria-invalid={Boolean(errors.address)}
          />
          {errors.address && (
            <p className="text-xs text-red-600 mt-1">{errors.address}</p>
          )}
        </div>

        <div className="md:col-span-1">
          <Label htmlFor="edit-neighborhood" className="text-[16px] mb-2">Bairro</Label>
          <Input
            type="text"
            id="edit-neighborhood"
            className="rounded-sm py-5"
            value={form.neighborhood}
            onChange={handleChange("neighborhood")}
            aria-invalid={Boolean(errors.neighborhood)}
          />
          {errors.neighborhood && (
            <p className="text-xs text-red-600 mt-1">{errors.neighborhood}</p>
          )}
        </div>

        <div className="md:col-span-1">
          <Label htmlFor="edit-city" className="text-[16px] mb-2">Cidade</Label>
          <Input
            type="text"
            id="edit-city"
            className="rounded-sm py-5"
            value={form.city}
            onChange={handleChange("city")}
            aria-invalid={Boolean(errors.city)}
          />
          {errors.city && (
            <p className="text-xs text-red-600 mt-1">{errors.city}</p>
          )}
        </div>

        <div className="md:col-span-1">
          <Label htmlFor="edit-state" className="text-[16px] mb-2">Estado</Label>
          <Input
            type="text"
            id="edit-state"
            maxLength={2}
            className="rounded-sm py-5 uppercase"
            value={form.state}
            onChange={handleChange("state")}
            aria-invalid={Boolean(errors.state)}
          />
          {errors.state && (
            <p className="text-xs text-red-600 mt-1">{errors.state}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <p className="text-[20px] font-bold mb-2">Você mora em:</p>

          <RadioGroup
            value={form.dwellingType}
            onValueChange={(value) => {
              onChange("dwellingType", value as EditSecondSectionFormData["dwellingType"])
            }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="building" id="edit-building-radio" />
                <Label htmlFor="edit-building-radio" className="text-[16px]">Edifício</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="house" id="edit-house-radio" />
                <Label htmlFor="edit-house-radio" className="text-[16px]">Casa</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {form.dwellingType === "building" && (
          <>
            <div className="md:col-span-2">
              <Label htmlFor="edit-complement-complete" className="text-[16px] mb-2">Complemento Completo</Label>
              <Input
                type="text"
                id="edit-complement-complete"
                className="rounded-sm py-5"
                value={form.complement}
                onChange={handleChange("complement")}
              />
              <span className="text-xs">Opcional</span>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="edit-reference-point" className="text-[16px] mb-2">Ponto de Referência</Label>
              <Input
                type="text"
                id="edit-reference-point"
                className="rounded-sm py-5"
                value={form.referencePoint}
                onChange={handleChange("referencePoint")}
              />
              <span className="text-xs">Opcional</span>
            </div>
          </>
        )}
    </div>
  )
}
