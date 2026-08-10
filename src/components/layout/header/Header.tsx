import { useLocation } from "react-router-dom"
import { usePartnerId } from "@/hooks/use-partner-id"

function isCheckoutPath(pathname: string) {
  return pathname === "/contratacao" || pathname.endsWith("/contratacao")
}

export default function Header() {
  const partnerId = usePartnerId()
  const { pathname } = useLocation()
  const showNav = !isCheckoutPath(pathname)

  if (!showNav) {
    return (
      <header className="py-4 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <a href="/">
              <img
                src="/logo-vivo-empresas.png"
                alt="Vivo Empresas"
                className="w-[91px] h-[48px]"
              />
            </a>
            {partnerId != null && (
              <img src="/logo-gold.png" alt="Vivo" className="hidden h-[39px] w-auto md:block" />
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
          <div className="flex items-center gap-8 md:gap-40">
            <a href="/">
              <img
                src="/logo-vivo-empresas.png"
                alt="Vivo Empresas"
                className="w-[91px] h-[48px]"
              />
            </a>
          </div>
          <div className="w-full flex items-center justify-end gap-8 md:px-12">
            <p className="hidden md:block text-[#505050]">Vantagens</p>
            <p className="hidden md:block text-[#505050]">Comparativo</p>
            <p className="hidden md:block text-[#505050]">Dúvidas frequentes</p>
          </div>
          {partnerId != null && (
            <img src="/logo-gold.png" alt="Vivo" className="hidden h-[39px] w-auto md:block" />
          )}
        </div>
      </div>
    </header>
  )
}
