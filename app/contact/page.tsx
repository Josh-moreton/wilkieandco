import { Metadata } from "next"
import { ContactForm } from "@/components/ContactForm/ContactForm"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us. We'll get back to you as soon as possible.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto min-h-screen bg-white p-8 dark:bg-gray-900">
      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold dark:text-white">Get in Touch</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
