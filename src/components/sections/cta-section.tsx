import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { motion } from "framer-motion"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { GradientButton } from "@/components/ui-library/buttons/gradient-button"
import { OutlineButton } from "@/components/ui-library/buttons/button-variants"

export function CtaSection() {
  return (
    <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-red-950/30 to-gray-950/30">
      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <AnimatedText
                text="Готовы создавать крутые интерфейсы?"
                variant="heading"
                className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl gradient-text"
                animation="wave"
              />
              <AnimatedText
                text="Начните работу с нашей библиотекой уже сегодня и измените подход к веб-разработке."
                variant="paragraph"
                className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70"
                animation="fade"
                delay={0.3}
              />
            </div>
            <motion.div
              className="flex flex-col gap-6 sm:flex-row sm:gap-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GradientButton
                glowAmount={5}
                size="lg"
                className="px-8 py-3"
                gradientFrom="from-red-500"
                gradientTo="to-red-700"
                asChild
              >
                <a href="#pricing" className="flex items-center">
                  Начать
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </a>
              </GradientButton>

              <AnimatedGradientBorder
                colors={["#dc2626", "#4b5563", "#dc2626", "#4b5563"]}
                borderWidth={1}
                duration={6}
              >
                <OutlineButton size="lg" className="bg-background w-full h-full border-0 px-8 py-3" asChild>
                  <a href="#components">Компоненты</a>
                </OutlineButton>
              </AnimatedGradientBorder>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
