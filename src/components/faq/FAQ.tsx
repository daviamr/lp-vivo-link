import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  const faq = [
    {
      question: "O que é a Internet Dedicada da Vivo?",
      answer: "É uma solução de internet dedicada com 100% da velocidade contratada, simetria entre upload e download, baixa latência e alta disponibilidade. Ideal para empresas que precisam de conectividade empresarial confiável para e-commerce, sistemas em nuvem e videoconferências.",
    },
    {
      question: "Qual a diferença entre link dedicado e internet comum?",
      answer: "A internet dedicada oferece um link exclusivo para sua empresa, com desempenho constante. Já a banda larga de fibra é compartilhada, podendo ter variações de velocidade. Com a Vivo, sua empresa recebe uma fibra exclusiva com prazo de instalação garantido.",
    },
    {
      question: "Quais são os benefícios da Internet Dedicada da Vivo?",
      answer: <>
        <ul>
          <li>&bull; 100% da velocidade contratada e conexão simétrica</li>
          <li>&bull; Suporte técnico 24x7 com reparo em até 4h</li>
          <li>&bull; SLA de até 99,6% e relatórios de desempenho</li>
          <li>&bull; Ideal para empresas que precisam de IP fixo e alta performance</li>
        </ul>
      </>,
    },
    {
      question: "A Internet Dedicada da Vivo inclui modem ou roteador?",
      answer: "Sim. A solução inclui os equipamentos necessários, como modem ou roteador empresarial, conforme o plano contratado. Tudo é dimensionado para garantir conectividade empresarial de alta qualidade.",
    },
    {
      question: "Quais modalidades estão disponíveis na contratação de Internet Dedicada?",
      answer: "Oferecemos desde planos básicos até soluções com segurança avançada, SD-WAN, firewall, VPN e monitoramento proativo. Tudo com link dedicado corporativo e suporte especializado.",
    },
    {
      question: "Quais velocidades e latência estão disponíveis na Internet Dedicada Vivo?",
      answer: "A Vivo oferece planos com diferentes capacidades, desde 30 Mbps até links de altíssima velocidade, de acordo com a necessidade da sua empresa. Já a nossa latência celebrada em contrato é de 50ms.",
    },
    {
      question: "Qual a latência do link de Internet Dedicada da Vivo?",
      answer: "Nossa latência celebrada em contrato é de 50ms.",
    },
    {
      question: "Qual a diferença entre link dedicado e internet dedicada?",
      answer: "Link dedicado é o termo técnico mais conhecido para uma conexão exclusiva entre a empresa e a operadora, garantindo estabilidade, velocidade contratada e segurança. A Vivo comercializa esse serviço com o nome de Internet Dedicada, oferecendo os mesmos benefícios, com suporte especializado e SLA de até 99,6%. Ou seja, são nomes diferentes para a mesma solução de alta performance.",
    },
    {
      question: "Quanto custa um link dedicado da Vivo?",
      answer: "O preço da Internet Dedicada (Link Dedicado) varia conforme a velocidade contratada, região e nível de serviço (SLA). Planos começam com valores para 30 Mega e podem escalar conforme a necessidade da sua empresa.",
    },
    {
      question: "Quando contratar internet dedicada?",
      answer: "A internet dedicada é indicada quando a empresa precisa de alta disponibilidade, baixa latência e conexão estável para operações críticas como ERP, e-commerce e videoconferência.",
    },
    {
      question: "Internet dedicada da Vivo tem velocidade garantida?",
      answer: "Sim. Diferente da banda larga empresarial comum, a internet dedicada garante 100% da velocidade contratada, com conexão simétrica para upload e download.",
    },
    {
      question: "Para quais empresas o link dedicado é recomendado?",
      answer: "O link dedicado é recomendado para empresas que utilizam sistemas em nuvem, e-commerce, telefonia IP, VPN ou que precisam de alta disponibilidade de rede.",
    },
  ]

  return (
    <div>
      <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
        {faq.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-semibold">{item.question}</AccordionTrigger>
            <AccordionContent className="pb-2 h-full">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}