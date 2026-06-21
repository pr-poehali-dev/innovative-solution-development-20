import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/scroll-reveal"

export function FaqSection() {
  const faqs = [
    {
      question: "Что делает ModbusForge?",
      answer:
        "ModbusForge — это онлайн-сервис, в котором вы заполняете таблицу регистров Modbus (адреса, типы, описания, единицы измерения) прямо в браузере и одним кликом выгружаете готовый Excel-файл с правильным форматированием.",
    },
    {
      question: "Какие типы регистров поддерживаются?",
      answer:
        "Поддерживаются все стандартные типы Modbus: Holding Registers, Input Registers, Coils и Discrete Inputs. Для каждого можно указать адрес, тип данных, права доступа и описание.",
    },
    {
      question: "В каком формате выгружается файл?",
      answer:
        "Карта регистров выгружается в формате Excel (.xlsx) с готовой структурой колонок, что удобно для документации, передачи интеграторам и загрузки в SCADA-системы.",
    },
    {
      question: "Нужно ли что-то устанавливать?",
      answer:
        "Нет, сервис работает полностью в браузере. Не нужно устанавливать программы — просто откройте конструктор, заполните таблицу и скачайте результат.",
    },
    {
      question: "Можно ли сохранить карту регистров для повторного использования?",
      answer:
        "Да, вы можете сохранять готовые карты регистров как шаблоны и переиспользовать их в новых проектах, чтобы не заполнять одинаковые данные заново.",
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
                Ответы на популярные вопросы о работе с картами регистров Modbus.
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