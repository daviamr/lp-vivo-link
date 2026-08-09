export function CheckoutProgress({ progress }: CheckoutprogresssProps) {
  const conditional =
    (progress === 1) ? 'w-[20%]' :
      (progress === 2) ? 'w-[40%]' :
        (progress === 3) ? 'w-[60%]' :
          (progress === 4) ? 'w-[80%]' :
            (progress === 5) ? 'w-[100%]' : 'w-0'

  const liDefaultStyle = `relative flex justify-center items-center m-auto rounded-full w-9 h-9 shadow`
  const spanDefaultStyle = `absolute text-sm`
  return (
    <div className="relative top-0 mt-9">
      <ul className="grid grid-cols-5 text-center text-[#3F3F3F] text-[20px] font-bold mb-16">
        <li
          className={`${liDefaultStyle} ${(progress >= 1 ? 'bg-[#1F1D1D] text-white font-bold' : 'bg-white')}`}>
          1
          <span
            className={`${spanDefaultStyle} -bottom-8 ${(progress >= 1 && 'text-[#1F1D1D] font-bold')}`}>
            Titular
          </span>
        </li>
        <li
          className={`${liDefaultStyle} ${(progress >= 2 ? 'bg-[#1F1D1D] text-white font-bold' : 'bg-white')}`}>
          2
          <span
            className={`${spanDefaultStyle} -bottom-8 ${(progress >= 2 && 'text-[#1F1D1D] font-bold')}`}>
            Extras
          </span>
        </li>
        <li
          className={`${liDefaultStyle} ${(progress >= 3 ? 'bg-[#1F1D1D] text-white font-bold' : 'bg-white')}`}>
          3
          <span
            className={`${spanDefaultStyle} -bottom-8 ${(progress >= 3 && 'text-[#1F1D1D] font-bold')}`}>
            Instalação
          </span>
        </li>
        <li
          className={`${liDefaultStyle} ${(progress >= 4 ? 'bg-[#1F1D1D] text-white font-bold' : 'bg-white')}`}>
          4
          <span
            className={`${spanDefaultStyle} -bottom-8 ${(progress >= 4 && 'text-[#1F1D1D] font-bold')}`}>
            Agendamento
          </span>
        </li>
        <li
          className={`${liDefaultStyle} ${(progress >= 5 ? 'bg-[#1F1D1D] text-white font-bold' : 'bg-white')}`}>
          5
          <span
            className={`${spanDefaultStyle} -bottom-8 ${(progress >= 5 && 'text-[#1F1D1D] font-bold')}`}>
            Confirmação
          </span>
        </li>
      </ul>
      <div className={`bg-[#1F1D1D] h-[3px] absolute top-4 duration-300 -z-5 ${conditional}`} />
      <div className="bg-[#AAAAAA] w-full h-[3px] absolute top-4 -z-10" />
    </div>
  )
}

type CheckoutprogresssProps = {
  progress: number
}