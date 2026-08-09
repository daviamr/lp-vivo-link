import { useCallback, useEffect, useRef, useState } from "react"
import type { ProductExtraGroup, ProductExtraOption } from "@/types/extras"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/price"
import { toLegacyExtra } from "@/lib/extras"
import { trackExtrasSelected } from "@/lib/gtm"
import { Cast, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"

type ExtrasCardProps = {
  groups: ProductExtraGroup[]
  selectedIds: string[]
  onChange: (selectedIds: string[]) => void
}

type ExtraOptionCardProps = {
  option: ProductExtraOption
  group: ProductExtraGroup
  isSelected: boolean
  onToggle: (option: ProductExtraOption, group: ProductExtraGroup) => void
}

function ExtraOptionCard({ option, group, isSelected, onToggle }: ExtraOptionCardProps) {
  return (
    <div
      className={cn(
        "shrink-0 text-center gap-4 p-4 border rounded-sm border-[#CBC9C9] w-full max-w-[150px] text-[#3F3F3F]",
        isSelected && "bg-transparent",
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="mb-7">
          <p className="text-[14px] leading-4.5 font-bold mb-4 h-[36px]">{option.label}</p>
          <p className="text-[10px] text-nowrap">Adicione no pacote por:</p>
          <p className="text-sm font-bold text-[#1B7E6C]">
            R$ {formatPrice(option.price)}
            <span className="text-[10px] text-[#3F3F3F]">/mês</span>
          </p>
          {option.description && (
            <p className="text-[10px] text-[#3F3F3F]">{option.description}</p>
          )}
        </div>

        <Button
          type="button"
          onClick={() => onToggle(option, group)}
          className={cn(
            "rounded-full px-5 cursor-pointer text-[10px] bg-[#E73871] duration-300 text-white font-bold hover:bg-[#E73871]/80",
            isSelected && "border-black text-black bg-transparent hover:bg-transparent",
          )}>
          {isSelected ? (
            <>
              <Minus size={6} color="black" />{" "}
              <span className="text-[10px]">Remover</span>
            </>
          ) : (
            <>
              <Plus size={6} /> <span className="text-[10px]">Adicionar</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

type ExtrasOptionsRowProps = {
  group: ProductExtraGroup
  selectedIds: string[]
  onToggle: (option: ProductExtraOption, group: ProductExtraGroup) => void
}

function ExtrasOptionsRow({ group, selectedIds, onToggle }: ExtrasOptionsRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const useCarousel = isMobile
    ? group.options.length >= 3
    : group.options.length > 4

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    const updateIsMobile = () => setIsMobile(mediaQuery.matches)

    updateIsMobile()
    mediaQuery.addEventListener("change", updateIsMobile)

    return () => mediaQuery.removeEventListener("change", updateIsMobile)
  }, [])

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    const threshold = 4

    setCanScrollLeft(scrollLeft > threshold)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - threshold)
  }, [])

  useEffect(() => {
    if (!useCarousel) return

    const container = scrollRef.current
    if (!container) return

    updateScrollState()

    container.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)

    const observer = new ResizeObserver(updateScrollState)
    observer.observe(container)

    return () => {
      container.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
      observer.disconnect()
    }
  }, [useCarousel, updateScrollState, group.options.length])

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return

    const scrollAmount = (150 + 16) * 4
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative">
      {useCarousel && canScrollLeft && (
        <button
          type="button"
          aria-label="Ver extras anteriores"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#CBC9C9] bg-white text-[#3F3F3F] shadow-sm cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {useCarousel && canScrollRight && (
        <button
          type="button"
          aria-label="Ver próximos extras"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#CBC9C9] bg-white text-[#3F3F3F] shadow-sm cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
      )}

      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 bg-white",
          useCarousel
            ? cn(
                "overflow-x-auto scroll-smooth scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                canScrollLeft && "pl-10",
                canScrollRight && "pr-10",
              )
            : "flex-wrap items-center justify-start",
        )}
      >
        {group.options.map((option) => (
          <ExtraOptionCard
            key={option.id}
            option={option}
            group={group}
            isSelected={selectedIds.includes(option.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}

export default function ExtrasCard({ groups, selectedIds, onChange }: ExtrasCardProps) {
  const handleToggleOption = (option: ProductExtraOption, group: ProductExtraGroup) => {
    const groupOptionIds = group.options.map((item) => item.id)
    let newSelectedIds: string[]

    if (selectedIds.includes(option.id)) {
      newSelectedIds = selectedIds.filter((id) => id !== option.id)
    } else if (group.input_type === "radio") {
      newSelectedIds = [
        ...selectedIds.filter((id) => !groupOptionIds.includes(id)),
        option.id,
      ]
    } else {
      newSelectedIds = [...selectedIds, option.id]
    }

    onChange(newSelectedIds)
    trackExtrasSelected(toLegacyExtra(option), newSelectedIds)
  }

  if (groups.length === 0) {
    return (
      <p className="text-center border-dashed border py-12 rounded-sm mt-7 text-sm text-[#525252]">
        Nenhum pacote adicional disponível para este plano.
      </p>
    )
  }

  return (
    <div className="w-full space-y-8 mt-7">
      {groups.map((group) => (
        <section key={group.id}>
          <div className="flex items-center gap-5 mb-6">
            {group.images[0] ? (
              <img
                src={group.images[0]}
                alt={group.label}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <div className="bg-[#E73871] w-max p-2 rounded-full">
                <Cast size={22} color="#FFF" />
              </div>
            )}
            <p className="text-[16px] font-bold">{group.label}</p>
          </div>

          <ExtrasOptionsRow
            group={group}
            selectedIds={selectedIds}
            onToggle={handleToggleOption}
          />
        </section>
      ))}
    </div>
  )
}
