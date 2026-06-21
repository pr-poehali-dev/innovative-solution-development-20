import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { ComponentLibraryShowcase } from "@/components/sections/component-library-showcase"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { BlogSection } from "@/components/sections/blog-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaSection } from "@/components/sections/cta-section"
import { MouseGlow } from "@/components/ui-library/effects/mouse-glow"

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <PageTransition>
          <main className="flex-1 flex flex-col items-center relative">
            {/* Enhanced global cursor effect with subtle red glow */}
            <MouseGlow
              color="rgba(220, 38, 38, 0.12)"
              size={600}
              blur={150}
              opacity={0.6}
              followSpeed={0.05}
              pulseEffect={true}
              pulseSpeed={4}
              pulseScale={1.05}
            />

            <HeroSection />
            <FeaturesSection />
            <ComponentLibraryShowcase />
            <TestimonialsSection />
            <PricingSection />
            <BlogSection />
            <FaqSection />
            <CtaSection />
          </main>
        </PageTransition>
        <SiteFooter />
      </div>
    </ThemeProvider>
  )
}

export default Index
