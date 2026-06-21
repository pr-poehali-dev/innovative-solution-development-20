import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/scroll-reveal"

export function FaqSection() {
  const faqs = [
    {
      question: "Что такое PixelForge?",
      answer:
        "PixelForge - это премиум-библиотека UI-компонентов на базе shadcn/ui и Aceternity UI для современных веб-приложений. Она содержит коллекцию красиво оформленных, доступных и настраиваемых компонентов для React и Next.js.",
    },
    {
      question: "Как начать работу с PixelForge?",
      answer:
        "Для начала приобретите подходящую лицензию, скачайте библиотеку и следуйте нашей документации для интеграции компонентов в ваш проект.",
    },
    {
      question: "Можно ли кастомизировать компоненты?",
      answer:
        "Да, все компоненты полностью настраиваемые. Вы можете менять цвета, размеры, анимации и другие свойства под ваш бренд и дизайн-требования.",
    },
    {
      question: "Совместим ли PixelForge с моим стеком?",
      answer:
        "PixelForge создан для работы с React и Next.js. Он отлично интегрируется с Tailwind CSS и TypeScript, что делает его идеальным для современной веб-разработки.",
    },
    {
      question: "Есть ли поддержка?",
      answer:
        "Да, мы предоставляем поддержку в зависимости от тарифа. Тарифы Про и Бизнес включают приоритетную поддержку для решения любых вопросов.",
    },
  ]

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl">
                Частые вопросы
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Ответы на популярные вопросы о нашей библиотеке компонентов.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl py-12">
          <ScrollReveal>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glassmorphic-accordion-item">
                  <AccordionTrigger className="text-left font-medium tracking-tight">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground opacity-70">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
