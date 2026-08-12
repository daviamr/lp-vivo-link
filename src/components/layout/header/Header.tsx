import { Menu } from "lucide-react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { usePartner } from "@/hooks/use-partner-id"
import { getPartnerHashFromUrl } from "@/lib/partner-hash"

function isCheckoutPath(pathname: string) {
  return pathname === "/contratacao" || pathname.endsWith("/contratacao")
}

export default function Header() {
  const { partnerName, partnerLogoUrl } = usePartner()
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const showNav = !isCheckoutPath(pathname)
  const partnerHash = getPartnerHashFromUrl()
  const homePath = partnerHash ? `/${partnerHash}` : "/"

  const navItems = [
    { label: "Vantagens", href: `${homePath}#vantagens` },
    { label: "Comparativo", href: `${homePath}#comparativo` },
    { label: "Dúvidas frequentes", href: `${homePath}#duvidas` },
  ]

  if (!showNav) {
    return (
      <header className="py-4 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <a href={homePath}>
              <img
                src="/logo-vivo-empresas.png"
                alt="Vivo Empresas"
                className="w-[91px] h-[48px]"
              />
            </a>
            {partnerLogoUrl && (
              <img
                src={partnerLogoUrl}
                alt={partnerName ?? "Parceiro"}
                className="hidden h-[39px] w-auto md:block"
              />
            )}
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="py-4 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className={`flex items-center justify-between w-full gap-8 md:gap-40 md:justify-start ${isMenuOpen ? "pb-4" : ""}`}>
            <a href={homePath}>
              <img
                src="/logo-vivo-empresas.png"
                alt="Vivo Empresas"
                className="w-[91px] h-[48px]"
              />
            </a>

            <Menu
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />

            <div className="hidden w-full items-center justify-end gap-8 md:flex md:px-12">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-[#505050]">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          {partnerLogoUrl && (
            <img
              src={partnerLogoUrl}
              alt={partnerName ?? "Parceiro"}
              className="hidden h-[39px] w-auto md:block"
            />
          )}
        </div>
      </div>
      {isMenuOpen && (
        <ul className="flex flex-col border-t bg-white w-full">
          {navItems.map((item) => (
            <li key={item.href} className="pt-4 select-none">
              <a
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="pl-4 text-[#505050]"
              >
                {item.label}
              </a>
            </li>
          ))}
          {partnerLogoUrl && (
            <li className="pt-4 pb-4 select-none pl-4">
              <img
                src={partnerLogoUrl}
                alt={partnerName ?? "Parceiro"}
                className="h-[39px] w-auto"
              />
            </li>
          )}
        </ul>
      )}
    </header>
  )
}
