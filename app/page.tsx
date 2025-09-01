import { Metadata } from "next"
import { ContactForm } from "@/components/ContactForm"
import { Hero } from "@/components/Hero"
import { ProjectSlider } from "@/components/ProjectSlider"
import { Testimonials } from "@/components/Testimonials"

export const metadata: Metadata = {
  title: "Wilkie & Co - Professional Construction Services",
  description: "Professional construction services built on trust and excellence. Commercial, residential, and industrial construction projects.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Wilkie & Co - Professional Construction Services",
    description: "Professional construction services built on trust and excellence. Commercial, residential, and industrial construction projects.",
    url: "https://wilkieandco.com/",
    siteName: "Wilkie & Co",
    images: [
      {
        width: 1200,
        height: 630,
        url: "/og-image.jpg",
      },
    ],
    type: 'website',
  },
}

export default function Web() {
  return (
    <>
      <Hero />
      <ProjectSlider />
      <Testimonials />
      <ContactForm />
    </>
  )
}
