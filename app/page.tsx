import { Metadata } from "next"
import { ContactForm } from "@/components/ContactForm/ContactForm"
import { FullPageScroll } from "@/components/FullPageScroll/FullPageScroll"
import { Hero } from "@/components/Hero/Hero"
import { ProjectSlider } from "@/components/ProjectSlider/ProjectSlider"
import { Testimonials } from "@/components/Testimonials/Testimonials"

export const metadata: Metadata = {
  title: "Wilkie & Co - Professional Construction Services",
  description: "Building Excellence, Creating Foundations for Tomorrow. Professional construction services with over two decades of experience in residential, commercial, and industrial projects.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://wilkieandco.vercel.app/",
    title: "Wilkie & Co - Professional Construction Services",
    description: "Building Excellence, Creating Foundations for Tomorrow. Professional construction services with over two decades of experience.",
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
      <div key="testimonials" className="w-full bg-white dark:bg-slate-800">
        <Testimonials />
      </div>
  <div key="contact" className="w-screen bg-slate-50 dark:bg-slate-900 min-h-[100dvh] flex items-center">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24 w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Ready to start your next construction project? Contact us today for a free consultation 
              and let's discuss how we can bring your vision to life.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </FullPageScroll>
  )
}
