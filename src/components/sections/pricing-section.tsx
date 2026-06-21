import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { motion } from "framer-motion"

export function PricingSection() {
  const plans = [
    {
      name: "Старт",
      description: "Для небольших проектов и независимых разработчиков.",
      price: "4 900 ₽",
      duration: "единоразово",
      features: [
        "50+ UI-компонентов",
        "Адаптивный дизайн",
        "Интеграция с Tailwind CSS",
        "Поддержка 6 месяцев",
        "Базовая документация",
      ],
      cta: "Начать",
      popular: false,
    },
    {
      name: "Про",
      description: "Для профессионалов и небольших команд.",
      price: "9 900 ₽",
      duration: "единоразово",
      features: [
        "100+ UI-компонентов",
        "Адаптивный дизайн",
        "Интеграция с Tailwind CSS",
        "Поддержка 12 месяцев",
        "Полная документация",
        "Исходный код",
        "Премиум-компоненты",
      ],
      cta: "Выбрать Про",
      popular: true,
    },
    {
      name: "Бизнес",
      description: "Для крупных команд и сложных проектов.",
      price: "24 900 ₽",
      duration: "единоразово",
      features: [
        "200+ UI-компонентов",
        "Адаптивный дизайн",
        "Интеграция с Tailwind CSS",
        "Пожизненная поддержка",
        "Полная документация",
        "Исходный код",
        "Премиум-компоненты",
        "Кастомные компоненты",
        "Приоритетная поддержка",
      ],
      cta: "Связаться",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl">
                Простые и понятные цены
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Выберите подходящий тариф и начните создавать потрясающие интерфейсы.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className={`h-full flex flex-col glassmorphic-card ${plan.popular ? "border-glow-red" : ""}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    Хит
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="tracking-tight">{plan.name}</CardTitle>
                  <CardDescription className="opacity-70">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 opacity-70">{plan.duration}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.popular ? (
                    <AnimatedGradientBorder
                      colors={["#dc2626", "#4b5563", "#dc2626", "#4b5563"]}
                      borderWidth={1}
                      duration={8}
                    >
                      <Button className="w-full bg-background border-0 text-foreground hover:text-white">
                        {plan.cta}
                      </Button>
                    </AnimatedGradientBorder>
                  ) : (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="w-full neumorphic-button">{plan.cta}</Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
