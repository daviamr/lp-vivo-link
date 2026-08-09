import { Copyright } from "lucide-react";
import DefaultLayout from "../default-layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { getPartnerHashFromUrl } from "@/lib/partner-hash";
import { usePartnerId } from "@/hooks/use-partner-id";

export function Footer({ setIsTalkToUsOpen }: { setIsTalkToUsOpen: (isOpen: boolean) => void }) {
  const navigate = useNavigate();
  const partnerId = usePartnerId();
  const partnerHash = getPartnerHashFromUrl();
  const privacyPath = partnerHash ? `/${partnerHash}/politica-de-privacidade` : "/politica-de-privacidade";

  return (
    <footer className="bg-white">
      <div className="py-4 bg-[#3F3F3F]">
        <DefaultLayout>
          <nav className="text-center md:text-left flex flex-wrap gap-2 items-center justify-center sm:gap-8 text-white">
            <a href="#" target="_blank" className="flex items-center gap-2 min-w-80 md:min-w-auto"><Copyright /> 2026 - Todos os direitos reservados</a>
            <p className="min-w-80 md:min-w-auto cursor-pointer" onClick={() => navigate(privacyPath)}>Política de Privacidade</p>
            <p className="min-w-80 md:min-w-auto cursor-pointer" onClick={() => setIsTalkToUsOpen(true)}>Fale Conosco</p>
          </nav>
        </DefaultLayout>
      </div>

      <DefaultLayout>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-32">
          <div className="flex items-center gap-8">
            <img
              src="/logo-vivo-empresas.png"
              alt="Vivo Empresas"
              className="w-[91px] h-[48px]"
            />

            {partnerId != null && (
              <img
                className="my-4 w-auto h-[39px]"
                src="/logo-gold.png"
                alt="Logo" />
            )}
          </div>

          <p className="text-xs text-center max-w-120 text-[#747474]">
            {partnerId != null && "Gold Empresas - Parceiro Vivo Empresa"}<br />
            LTL TELEFONIA E COMUNICAÇÕES LTD | 20.395.452/0001-27<br />
            RRua Quintana, 887 | Cidade Monções | São Paulo - SP | CEP 04569-011
          </p>
        </div>
      </DefaultLayout>
    </footer>
  )
}
