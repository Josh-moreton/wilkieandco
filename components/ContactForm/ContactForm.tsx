"use client"

import * as React from "react"
import { useState } from "react"
import { z } from "zod"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Textarea } from "@/components/ui"

// Client-side validation schema (matches server-side)
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
}).refine(
  (data) => data.email || data.phone,
  {
    message: "Either email or phone number is required",
    path: ["email"],
  }
)

type ContactFormData = z.infer<typeof contactFormSchema>

interface FormErrors {
  name?: string[]
  email?: string[]
  phone?: string[]
  message?: string[]
  root?: string[]
}

interface ApiErrorResponse {
  error: string
  message?: string
  details?: {
    name?: { _errors: string[] }
    email?: { _errors: string[] }
    phone?: { _errors: string[] }
    message?: { _errors: string[] }
    _errors?: string[]
  }
}

interface ApiSuccessResponse {
  success: boolean
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear field errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const result = contactFormSchema.safeParse(formData)
    
    if (!result.success) {
      const formattedErrors = result.error.format()
      const newErrors: FormErrors = {}
      
      if (formattedErrors.name?._errors) newErrors.name = formattedErrors.name._errors
      if (formattedErrors.email?._errors) newErrors.email = formattedErrors.email._errors
      if (formattedErrors.phone?._errors) newErrors.phone = formattedErrors.phone._errors
      if (formattedErrors.message?._errors) newErrors.message = formattedErrors.message._errors
      if (formattedErrors._errors) newErrors.root = formattedErrors._errors
      
      setErrors(newErrors)
      return false
    }
    
    setErrors({})
    return true
  }

  // Extracted helpers to keep submit handler simple
  const mapServerErrors = (details: ApiErrorResponse["details"]) => {
    const serverErrors: FormErrors = {}
    if (!details) return serverErrors
    if (details.name?._errors) serverErrors.name = details.name._errors
    if (details.email?._errors) serverErrors.email = details.email._errors
    if (details.phone?._errors) serverErrors.phone = details.phone._errors
    if (details.message?._errors) serverErrors.message = details.message._errors
    if (details._errors) serverErrors.root = details._errors
    return serverErrors
  }

  const sendContactRequest = async (data: ContactFormData): Promise<ApiSuccessResponse> => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const result = (await response.json()) as ApiErrorResponse | ApiSuccessResponse
    if (!response.ok) {
      const errorResult = result as ApiErrorResponse
      const err = new Error(errorResult.message || 'Failed to send message') as Error & {
        details?: ApiErrorResponse['details']
      }
      err.details = errorResult.details
      throw err
    }
    return result as ApiSuccessResponse
  }

  const isErrorWithDetails = (
    e: unknown
  ): e is Error & { details?: ApiErrorResponse['details'] } => {
    return typeof e === 'object' && e !== null && 'details' in (e as Record<string, unknown>)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const successResult = await sendContactRequest(formData)
      setSubmitStatus('success')
      setSubmitMessage(successResult.message || 'Your message has been sent successfully!')
      setFormData({ name: "", email: "", phone: "", message: "" })
      setErrors({})

    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
      if (isErrorWithDetails(error)) {
        const mapped = mapServerErrors(error.details)
        if (Object.keys(mapped).length) setErrors(mapped)
      }
      setSubmitMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mx-auto max-w-2xl border-slate-200/20 bg-white/70 shadow-2xl backdrop-blur supports-[backdrop-filter]:backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/60">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-serif">Contact Us</CardTitle>
        <CardDescription>Get in touch. We’ll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-live="polite" aria-busy={isSubmitting}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange('name')}
                placeholder="Your full name"
                className={"h-12 " + (errors.name ? "border-red-500" : "")}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-sm text-muted-foreground">(required if no phone)</span></Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="your.email@example.com"
                className={"h-12 " + (errors.email ? "border-red-500" : "")}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone <span className="text-sm text-muted-foreground">(required if no email)</span></Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                placeholder="+1 (555) 123-4567"
                className={"h-12 " + (errors.phone ? "border-red-500" : "")}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone[0]}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange('message')}
                placeholder="Tell us how we can help you..."
                rows={6}
                className={"min-h-[140px] " + (errors.message ? "border-red-500" : "")}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <p className="text-sm text-red-500">{errors.message[0]}</p>}
              <p className="text-xs text-muted-foreground">{formData.message.length}/1000 characters</p>
            </div>
          </div>

          {errors.root && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
              {errors.root.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="rounded-md border border-green-200 bg-green-50 p-3 text-green-800 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-200">
              {submitMessage}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
              {submitMessage}
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-yellow-500 text-slate-900 hover:bg-yellow-600 disabled:opacity-60">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">Prefer email? Write to us at info@wilkieandco.com</p>
        </form>
      </CardContent>
    </Card>
  )
}