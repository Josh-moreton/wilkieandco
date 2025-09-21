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
      <ProjectSlider key="projects" />
      <div key="testimonials" className="w-screen bg-transparent">
        <Testimonials />
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
