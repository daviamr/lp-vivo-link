import { CircleCheck, CircleDot, Clock3, Headset, SignalMedium } from "lucide-react";

export function HomeTable() {
  return (
    <div className="max-w-255 bg-white rounded-sm m-auto">

      <div className="flex items-baseline justify-center">

        <div className="w-full">
          <p
            className="bg-[#EFEDF2] text-[#6B6975] font-semibold rounded-full py-2 px-8 text-sm w-max ml-auto mr-6 mb-4">
            Internet Convencional</p>
          <ul className="text-sm text-[#6B6975] text-right">
            <li className="flex h-[58px] items-center justify-end border-y border-[#EFEDF2] p-4">
              Banda compartilhada, oscila
            </li>
            <li className="flex h-[58px] items-center justify-end border-b border-[#EFEDF2] p-4">
              Atendimento padrão, sem prioridade
            </li>
            <li className="flex h-[58px] items-center justify-end border-b border-[#EFEDF2] p-4">
              Sem SLA formal
            </li>
            <li className="flex h-[58px] items-center justify-end p-4">
              Navegação, e-mail, tarefas do dia a dia
            </li>
          </ul>
        </div>

        <div className="border-x">
          <p className="shadow-md text-[#E73871] font-bold text-[20px] rounded-full w-max m-auto mb-4 py-[5px] px-[4px]">VS</p>
          <ul>
            <li className="p-4 border-y border-[#EFEDF2] flex items-center gap-2 h-[58px]">
              <SignalMedium size={20} className="text-[#E73871]" /> Velocidade
            </li>
            <li className="p-4 border-b border-[#EFEDF2] flex items-center gap-2 h-[58px]">
              <Clock3 size={20} className="text-[#E73871]" /> Suporte
            </li>
            <li className="p-4 border-b border-[#EFEDF2] flex items-center gap-2 h-[58px]">
              <Headset size={20} className="text-[#E73871]" /> Disponibilidade
            </li>
            <li className="p-4 flex items-center gap-2">
              <CircleDot size={20} className="text-[#E73871]" /> Ideal para
            </li>
          </ul>
        </div>

        <div className="w-full border-2 border-[#5A088A] rounded-md py-4">
          <p className="bg-linear-to-r from-[#5C098A] to-[#E73871] text-white font-semibold rounded-full py-2 px-8 text-sm w-max mr-auto ml-6 mb-4">Internet Dedicada Vivo</p>
          <ul className="text-sm text-[#221C2E] font-semibold text-left">
            <li className="p-4 border-y border-[#EFEDF2] flex items-center gap-2 h-[58px]">
              <CircleCheck fill="#7404C9" className="text-white" /> 100% da velocidade contratada
            </li>
            <li className="p-4 border-b border-[#EFEDF2] flex items-center gap-2 h-[58px]">
              <CircleCheck fill="#7404C9" className="text-white" /> 24x7, reparo em até 4 horas
            </li>
            <li className="p-4 border-b border-[#EFEDF2] flex items-center gap-2 h-[58px]">
              <CircleCheck fill="#7404C9" className="text-white" /> SLA de até 99,6%
            </li>
            <li className="p-4 flex items-center gap-2 h-[58px]">
              <CircleCheck fill="#7404C9" className="text-white" /> E-commerce, ERP, nuvem, operações críticas
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}