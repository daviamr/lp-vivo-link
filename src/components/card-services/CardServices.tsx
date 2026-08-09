export default function CardServices() {
  const services = [
    {
      description: "Suporte e atendimento especializado",
      img: "/vivo-icon1.webp",
    },
    {
      description: "Conexão mais estável",
      img: "/vivo-icon2.webp",
    },
    {
      description: "Internet mais rápida do Brasil",
      img: "/vivo-icon3.webp",
    },
    {
      description: "Instalação e Wi-fi grátis",
      img: "/vivo-icon4.webp",
    },
    {
      description: "Aplicativos para seu negócio",
      img: "/vivo-icon5.webp",
    },
  ]
  return (
    <>
      {services.map((service) => (
        <div key={service.description} className="flex flex-col gap-4 min-w-[290px] sm:min-w-auto">
          <img src={service.img} alt={service.description} className="max-w-[125px]"/>
          <p>{service.description}</p>
        </div>
      ))}
    </>
  )
}