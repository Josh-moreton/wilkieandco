import { Metadata } from "next"
import { ContactForm } from "@/components/ContactForm/ContactForm"
import { FullPageScroll } from "@/components/FullPageScroll/FullPageScroll"
import { Hero } from "@/components/Hero/Hero"
import { ProjectSlider } from "@/components/ProjectSlider/ProjectSlider"
import { Testimonials } from "@/components/Testimonials/Testimonials"

export const metadata: Metadata = {
  title: "Wilkie & Co - Expert Joinery Services Edinburgh",
  description:
    "Crafting Excellence, Creating Beautiful Interiors. Expert joinery services in Edinburgh specializing in bespoke kitchens, built-in furniture, and home renovations for individual homeowners.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://wilkieandco.vercel.app/",
    title: "Wilkie & Co - Expert Joinery Services Edinburgh",
    description:
      "Crafting Excellence, Creating Beautiful Interiors. Expert joinery services in Edinburgh for bespoke kitchens and home renovations.",
    images: [
      {
        width: 1200,
        height: 630,
        url: "/og-image.jpg",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <FullPageScroll>
      <Hero key="hero" />
      <ProjectSlider key="projects" id="projects" />
      <div key="testimonials" className="w-screen bg-transparent">
        <Testimonials />
      </div>
      {/* Mobile-only CTA gets its own page; desktop sees CTA inside Testimonials */}
      <div
        key="cta-mobile"
        id="cta-mobile"
        data-mobile-only
        className="relative flex min-h-[100dvh] w-screen items-center justify-center bg-transparent text-white md:hidden"
      >
        <div className="mx-auto w-full max-w-3xl px-4 pb-[env(safe-area-inset-bottom)]">
          <div className="rounded-2xl bg-slate-800/80 p-6 backdrop-blur">
            <h3 className="mb-3 font-serif text-2xl font-bold text-white">Ready to Transform Your Home?</h3>
            <p className="mb-5 text-base text-slate-300 text-pretty">
              Join our satisfied Edinburgh homeowners and experience the Wilkie & Co difference. Contact us today for a
              free consultation on your joinery or renovation project.
            </p>
            <div className="flex flex-col justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-yellow-600"
              >
                Get Free Consultation
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-slate-900"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
      <div key="contact" id="contact" className="relative flex min-h-[100dvh] w-screen items-center bg-transparent text-white">
        <div className="mx-auto w-full max-w-4xl px-4 py-8 md:py-16 lg:py-24">
          <div className="mb-6 text-center md:mb-12">
            <h2 className="mb-2 hidden font-serif text-2xl font-bold text-white md:mb-4 md:block md:text-4xl lg:text-5xl">
              Let's Discuss Your Project
            </h2>
            <p className="mx-auto hidden max-w-3xl text-lg text-slate-300 md:block md:text-xl">
              Ready to transform your home with beautiful joinery? Get in touch today for a free consultation and let's
              discuss how we can bring your vision to life with expert craftsmanship.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </FullPageScroll>
  )
}
