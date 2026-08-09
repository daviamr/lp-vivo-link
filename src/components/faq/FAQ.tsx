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
      answer: "lorem",
    },
    {
      question: "Quais são os benefícios da Internet Dedicada da Vivo?",
      answer: "lorem",
    },
    {
      question: "A Internet Dedicada da Vivo inclui modem ou roteador?",
      answer: "lorem",
    },
    {
      question: "Quais modalidades estão disponíveis na contratação de Internet Dedicada?",
      answer: "lorem",
    },
    {
      question: "Quais velocidades e latência estão disponíveis na Internet Dedicada Vivo?",
      answer: "lorem",
    },
    {
      question: "Qual a latência do link de Internet Dedicada da Vivo?",
      answer: "lorem",
    },
    {
      question: "Qual a diferença entre link dedicado e internet dedicada?",
      answer: "lorem",
    },
    {
      question: "Quanto custa um link dedicado da Vivo?",
      answer: "lorem",
    },
    {
      question: "Quando contratar internet dedicada?",
      answer: "lorem",
    },
    {
      question: "Qual a diferença entre link dedicado e internet dedicada?",
      answer: "lorem",
    },
    {
      question: "Internet dedicada da Vivo tem velocidade garantida?",
      answer: "lorem",
    },
    {
      question: "Qual a latência do link de Internet Dedicada da Vivo?",
      answer: "lorem",
    },
    {
      question: "Para quais empresas o link dedicado é recomendado?",
      answer: "lorem",
    },
  ]

  return (
    <div>
      <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
        {faq.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-semibold">{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}