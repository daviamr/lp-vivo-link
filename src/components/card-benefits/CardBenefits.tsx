export default function CardBenefits() {
  const services = [
    {
      title: "Conexão dedicada e estável",
      description: "100% da velocidade garantida para manter seus sistemas críticos sempre online.",
      img: "/img1.png",
    },
    {
      title: "Conexão dedicada e estável",
      description: "100% da velocidade garantida para manter seus sistemas críticos sempre online.",
      img: "/img2.png",
    },
    {
      title: "Conexão dedicada e estável",
      description: "100% da velocidade garantida para manter seus sistemas críticos sempre online.",
      img: "/img3.png",
    },
    {
      title: "Conexão dedicada e estável",
      description: "100% da velocidade garantida para manter seus sistemas críticos sempre online.",
      img: "/img4.png",
    },
  ]
  return (
    <>
      {services.map((service) => (
        <div key={service.description} className="flex flex-col gap-1">
          <div className="mb-2 flex h-30 w-full items-end justify-start">
            <img
              src={service.img}
              alt={service.description}
              className="max-h-26 max-w-26 object-contain object-left"
            />
          </div>
          <p className="font-bold">{service.title}</p>
          <p>{service.description}</p>
        </div>
      ))}
    </>
  )
}
