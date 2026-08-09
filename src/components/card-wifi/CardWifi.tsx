export default function CardWifi() {
  const wifi6Card = [
    { description: 'Wi-Fi que assegura a velocidade da Fibra', img: '/wifi-6-icon1.webp' },
    { description: 'Melhor desempenho mesmo com vários dispositivos conectados', img: '/wifi-6-icon2.webp' },
    { description: 'Menor latência, oferecendo mais estabilidade na conexão', img: '/wifi-6-icon3.webp' },
    { description: 'Maior eficiência energética', img: '/wifi-6-icon4.webp' },
  ]
  return (
    <>
      {wifi6Card.map((card) => (
        <div key={card.description}>
          <img src={card.img} alt={card.description} className="max-w-[70px]"/>
          <p>{card.description}</p>
        </div>
      ))}
    </>
  )
}