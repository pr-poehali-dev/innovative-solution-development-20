import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { ImageCard } from "@/components/ui-library/cards/image-card"
import { CtaCard } from "@/components/ui-library/cards/cta-card"
import { ProgressCard } from "@/components/ui-library/cards/progress-card"
import { GradientButton } from "@/components/ui-library/buttons/gradient-button"
import { PrimaryButton, SecondaryButton, OutlineButton } from "@/components/ui-library/buttons/button-variants"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui-library/animations/scroll-animations"
import { Sparkles, Zap, Layers, Palette, ArrowRight, CheckCircle, BookOpen, Lightbulb, Rocket } from "lucide-react"

export function ComponentLibraryShowcase() {
  const [activeTab, setActiveTab] = useState("cards")

  return (
    <section id="components" className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
            <div className="space-y-4">
              <AnimatedText
                text="Библиотека компонентов"
                variant="heading"
                className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl gradient-text"
                animation="slide"
              />
              <AnimatedText
                text="Исследуйте нашу коллекцию красиво оформленных UI-компонентов"
                variant="paragraph"
                className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70"
                animation="fade"
                delay={0.3}
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-12">
                <AnimatedGradientBorder
                  colors={["#dc2626", "#4b5563", "#dc2626", "#4b5563"]}
                  borderWidth={1}
                  duration={8}
                  containerClassName="rounded-full"
                >
                  <TabsList className="glassmorphic-tabs border-0">
                    <TabsTrigger value="cards">Карточки</TabsTrigger>
                    <TabsTrigger value="buttons">Кнопки</TabsTrigger>
                    <TabsTrigger value="progress">Прогресс</TabsTrigger>
                  </TabsList>
                </AnimatedGradientBorder>
              </div>

              {/* Cards Tab */}
              <TabsContent value="cards" className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium tracking-tight text-center">Карточки с изображениями</h3>
                  <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
                    Универсальные карточки с изображениями и текстом для демонстрации контента, продуктов или функций
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ScrollAnimation type="slide" direction="up" delay={0.1}>
                      <ImageCard
                        imageSrc="/placeholder.svg?height=300&width=500&text=Design"
                        imageAlt="Design System"
                        title="Дизайн-система"
                        description="Комплексная дизайн-система с единообразными компонентами и стилями для веб-приложений."
                        tags={["Дизайн", "UI/UX"]}
                        variant="default"
                        className="border-glow-red"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.2}>
                      <ImageCard
                        imageSrc="/placeholder.svg?height=300&width=500&text=Components"
                        imageAlt="Component Library"
                        title="Переиспользуемые компоненты"
                        description="Разрабатывайте быстрее с нашей библиотекой готовых настраиваемых UI-компонентов."
                        tags={["React", "TypeScript"]}
                        variant="hover-zoom"
                        className="border-glow-blue"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.3}>
                      <ImageCard
                        imageSrc="/placeholder.svg?height=300&width=500&text=Animation"
                        imageAlt="Animation Library"
                        title="Плавные анимации"
                        description="Оживите интерфейсы коллекцией производительных и доступных анимаций."
                        tags={["Motion", "Интерактив"]}
                        variant="hover-reveal"
                        className="border-glow-purple"
                      />
                    </ScrollAnimation>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <h3 className="text-2xl font-medium tracking-tight text-center">CTA-карточки</h3>
                  <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
                    Привлекающие внимание карточки для конверсии посетителей в клиентов
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ScrollAnimation type="slide" direction="up" delay={0.1}>
                      <CtaCard
                        title="Начните сегодня"
                        description="Присоединяйтесь к тысячам разработчиков, создающих крутые интерфейсы."
                        primaryAction={{ text: "Регистрация" }}
                        secondaryAction={{ text: "Подробнее" }}
                        variant="default"
                        icon={<Rocket className="h-6 w-6" />}
                        className="border-glow-green"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.2}>
                      <CtaCard
                        title="Премиум-функции"
                        description="Разблокируйте продвинутые компоненты с премиум-тарифом."
                        primaryAction={{ text: "Улучшить" }}
                        variant="gradient"
                        alignment="center"
                        buttonVariant="gradient"
                        icon={<Sparkles className="h-6 w-6" />}
                        className="border-glow-yellow"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.3}>
                      <CtaCard
                        title="Нужна помощь?"
                        description="Наша команда поддержки готова ответить на любые вопросы."
                        primaryAction={{ text: "Поддержка" }}
                        variant="glass"
                        alignment="right"
                        buttonVariant="magnetic"
                        icon={<Lightbulb className="h-6 w-6" />}
                        className="border-glow-orange"
                      />
                    </ScrollAnimation>
                  </div>
                </div>
              </TabsContent>

              {/* Buttons Tab */}
              <TabsContent value="buttons" className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium tracking-tight text-center">Стили кнопок</h3>
                  <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
                    Полная коллекция стилей кнопок для любых задач
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ScrollAnimation type="slide" direction="left" delay={0.1}>
                      <div className="p-6 rounded-xl border glassmorphic-card border-glow-red">
                        <h4 className="text-lg font-medium mb-6">Основные и вторичные</h4>
                        <div className="flex flex-wrap gap-6">
                          <StaggerContainer>
                            <StaggerItem>
                              <PrimaryButton>Основная</PrimaryButton>
                            </StaggerItem>
                            <StaggerItem>
                              <PrimaryButton leftIcon={<Zap className="h-4 w-4" />}>С иконкой</PrimaryButton>
                            </StaggerItem>
                            <StaggerItem>
                              <SecondaryButton>Вторичная</SecondaryButton>
                            </StaggerItem>
                            <StaggerItem>
                              <SecondaryButton rightIcon={<ArrowRight className="h-4 w-4" />}>
                                Подробнее
                              </SecondaryButton>
                            </StaggerItem>
                          </StaggerContainer>
                        </div>
                      </div>
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="right" delay={0.1}>
                      <div className="p-6 rounded-xl border glassmorphic-card border-glow-blue">
                        <h4 className="text-lg font-medium mb-6">Контурные и градиентные</h4>
                        <div className="flex flex-wrap gap-6">
                          <StaggerContainer>
                            <StaggerItem>
                              <OutlineButton>Контурная</OutlineButton>
                            </StaggerItem>
                            <StaggerItem>
                              <OutlineButton leftIcon={<BookOpen className="h-4 w-4" />}>Документация</OutlineButton>
                            </StaggerItem>
                            <StaggerItem>
                              <GradientButton>Градиент</GradientButton>
                            </StaggerItem>
                            <StaggerItem>
                              <GradientButton gradientFrom="from-blue-500" gradientTo="to-purple-600" glowAmount={4}>
                                Со свечением
                              </GradientButton>
                            </StaggerItem>
                          </StaggerContainer>
                        </div>
                      </div>
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.3}>
                      <div className="p-6 rounded-xl border glassmorphic-card border-glow-purple">
                        <h4 className="text-lg font-medium mb-6">Интерактивные кнопки</h4>
                        <div className="flex flex-wrap gap-6">
                          <StaggerContainer>
                            <StaggerItem>
                              <MagneticButton className="neumorphic-button-primary">
                                <span className="px-6 py-2.5">Магнитная</span>
                              </MagneticButton>
                            </StaggerItem>
                            <StaggerItem>
                              <GradientButton borderWidth={2}>Контур-градиент</GradientButton>
                            </StaggerItem>
                          </StaggerContainer>
                        </div>
                      </div>
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.4}>
                      <div className="p-6 rounded-xl border glassmorphic-card border-glow-green">
                        <h4 className="text-lg font-medium mb-6">Состояния и варианты</h4>
                        <div className="flex flex-wrap gap-6">
                          <StaggerContainer>
                            <StaggerItem>
                              <PrimaryButton isLoading loadingText="Загрузка...">
                                Отправить
                              </PrimaryButton>
                            </StaggerItem>
                            <StaggerItem>
                              <SecondaryButton disabled>Отключена</SecondaryButton>
                            </StaggerItem>
                            <StaggerItem>
                              <OutlineButton size="sm">Малая</OutlineButton>
                            </StaggerItem>
                            <StaggerItem>
                              <PrimaryButton size="lg">Большая</PrimaryButton>
                            </StaggerItem>
                          </StaggerContainer>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                </div>
              </TabsContent>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium tracking-tight text-center">Карточки прогресса</h3>
                  <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
                    Визуализируйте прогресс, статус выполнения и метрики с этими интерактивными карточками
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ScrollAnimation type="slide" direction="up" delay={0.1}>
                      <ProgressCard
                        title="Выполнение проекта"
                        description="Отслеживайте прогресс вашего проекта."
                        progress={65}
                        total={100}
                        status="default"
                        showPercentage
                        variant="default"
                        icon={<Layers className="h-6 w-6" />}
                        className="border-glow-red"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.2}>
                      <ProgressCard
                        title="Статус загрузки"
                        progress={80}
                        total={100}
                        status="success"
                        showPercentage
                        showFraction
                        variant="gradient"
                        progressColor="bg-gradient-to-r from-red-500 to-red-700"
                        icon={<CheckCircle className="h-6 w-6" />}
                        className="border-glow-blue"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.3}>
                      <ProgressCard
                        title="Использование хранилища"
                        description="Вы приближаетесь к лимиту хранилища."
                        progress={85}
                        total={100}
                        status="warning"
                        showPercentage
                        variant="outlined"
                        icon={<Palette className="h-6 w-6" />}
                        className="border-glow-purple"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.4}>
                      <ProgressCard
                        title="Прогресс обучения"
                        description="Отслеживайте прохождение курса."
                        progress={30}
                        total={100}
                        status="info"
                        showFraction
                        variant="glass"
                        progressColor="bg-blue-500"
                        icon={<BookOpen className="h-6 w-6" />}
                        className="border-glow-green"
                      />
                    </ScrollAnimation>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <ScrollAnimation type="fade">
                    <AnimatedGradientBorder
                      colors={["#dc2626", "#4b5563", "#dc2626", "#4b5563"]}
                      borderWidth={1}
                      duration={6}
                    >
                      <PrimaryButton
                        size="lg"
                        className="bg-background border-0 text-foreground hover:text-white px-6 py-2.5"
                      >
                        <span className="flex items-center">
                          Вся библиотека
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      </PrimaryButton>
                    </AnimatedGradientBorder>
                  </ScrollAnimation>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
