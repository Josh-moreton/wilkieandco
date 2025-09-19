import { Metadata } from "next"
import { ContactForm } from "@/components/ContactForm/ContactForm"
import { FullPageScroll } from "@/components/FullPageScroll/FullPageScroll"
import { Hero } from "@/components/Hero/Hero"
import { ProjectSlider } from "@/components/ProjectSlider/ProjectSlider"
import { Testimonials } from "@/components/Testimonials/Testimonials"

export const metadata: Metadata = {
  title: "Wilkie & Co - Expert Joinery Services Edinburgh",
  description: "Crafting Excellence, Creating Beautiful Interiors. Expert joinery services in Edinburgh specializing in bespoke kitchens, built-in furniture, and home renovations for individual homeowners.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://wilkieandco.vercel.app/",
    title: "Wilkie & Co - Expert Joinery Services Edinburgh",
    description: "Crafting Excellence, Creating Beautiful Interiors. Expert joinery services in Edinburgh for bespoke kitchens and home renovations.",
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
      <div key="testimonials" className="w-full bg-transparent">
        <Testimonials />
      </div>
  <div key="contact" id="contact" className="w-screen bg-transparent min-h-[100dvh] flex items-center">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24 w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-white mb-4">
              Let's Discuss Your Project
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to transform your home with beautiful joinery? Get in touch today for a free consultation 
              and let's discuss how we can bring your vision to life with expert craftsmanship.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </FullPageScroll>
  )
}
