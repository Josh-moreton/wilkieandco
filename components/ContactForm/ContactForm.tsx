"use client"

import * as React from "react"
import { useState } from "react"
import { z } from "zod"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "@/components/ui"

// Client-side validation schema (matches server-side)
const contactFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().optional().or(z.literal("")),
    message: z.string().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone number is required",
    path: ["email"],
  })

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

type InputChangeHandler = (
  field: keyof ContactFormData
) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

function ProgressIndicator({ currentStage }: Readonly<{ currentStage: 1 | 2 }>) {
  return (
    <div className="mb-4 md:hidden">
      <div className="mb-2 flex items-center justify-center space-x-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
            currentStage === 1 ? "bg-yellow-500 text-slate-900" : "bg-green-500 text-white"
          }`}
        >
          1
        </div>
        <div className={`h-1 w-8 ${currentStage === 2 ? "bg-yellow-500" : "bg-slate-300"}`} />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
            currentStage === 2 ? "bg-yellow-500 text-slate-900" : "bg-slate-300 text-slate-600"
          }`}
        >
          2
        </div>
      </div>
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Step {currentStage} of 2: {currentStage === 1 ? "Basic Information" : "Project Details"}
      </p>
    </div>
  )
}

function Stage1Fields({
  formData,
  errors,
  handleInputChange,
}: Readonly<{
  formData: ContactFormData
  errors: FormErrors
  handleInputChange: InputChangeHandler
}>) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-800 dark:text-slate-200">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleInputChange("name")}
          placeholder="Your full name"
          className={
            "h-12 bg-white/70 text-slate-900 dark:bg-slate-900/40 dark:text-slate-100 " +
            (errors.name ? "border-red-500" : "")
          }
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-800 dark:text-slate-200">
          Email <span className="text-muted-foreground text-sm">(required if no phone)</span>
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          placeholder="your.email@example.com"
          className={
            "h-12 bg-white/70 text-slate-900 dark:bg-slate-900/40 dark:text-slate-100 " +
            (errors.email ? "border-red-500" : "")
          }
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-slate-800 dark:text-slate-200">
          Phone <span className="text-muted-foreground text-sm">(optional)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleInputChange("phone")}
          placeholder="07123 456 789"
          className={
            "h-12 bg-white/70 text-slate-900 dark:bg-slate-900/40 dark:text-slate-100 " +
            (errors.phone ? "border-red-500" : "")
          }
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone[0]}</p>}
      </div>
    </div>
  )
}

function Stage2Fields({
  formData,
  errors,
  handleInputChange,
}: Readonly<{
  formData: ContactFormData
  errors: FormErrors
  handleInputChange: InputChangeHandler
}>) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="message" className="text-slate-800 dark:text-slate-200">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={handleInputChange("message")}
          placeholder="Tell us how we can help you..."
          rows={6}
          className={
            "min-h-[140px] bg-white/70 text-slate-900 placeholder:text-slate-500 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder:text-slate-400 " +
            (errors.message ? "border-red-500" : "")
          }
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message[0]}</p>}
        <p className="text-xs text-slate-500 dark:text-slate-400">{formData.message.length}/1000 characters</p>
      </div>
    </div>
  )
}

function DesktopLayout({
  formData,
  errors,
  handleInputChange,
}: Readonly<{
  formData: ContactFormData
  errors: FormErrors
  handleInputChange: InputChangeHandler
}>) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="name" className="text-slate-800 dark:text-slate-200">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleInputChange("name")}
          placeholder="Your full name"
          className={
            "h-12 bg-white/70 text-slate-900 dark:bg-slate-900/40 dark:text-slate-100 " +
            (errors.name ? "border-red-500" : "")
          }
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-800 dark:text-slate-200">
          Email <span className="text-muted-foreground text-sm">(required if no phone)</span>
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          placeholder="your.email@example.com"
          className={
            "h-12 bg-white/70 text-slate-900 dark:bg-slate-900/40 dark:text-slate-100 " +
            (errors.email ? "border-red-500" : "")
          }
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-slate-800 dark:text-slate-200">
          Phone <span className="text-muted-foreground text-sm">(required if no email)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleInputChange("phone")}
          placeholder="07123 456 789"
          className={
            "h-12 bg-white/70 text-slate-900 dark:bg-slate-900/40 dark:text-slate-100 " +
            (errors.phone ? "border-red-500" : "")
          }
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone[0]}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="message" className="text-slate-800 dark:text-slate-200">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={handleInputChange("message")}
          placeholder="Tell us how we can help you..."
          rows={6}
          className={
            "min-h-[140px] bg-white/70 text-slate-900 placeholder:text-slate-500 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder:text-slate-400 " +
            (errors.message ? "border-red-500" : "")
          }
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message[0]}</p>}
        <p className="text-xs text-slate-500 dark:text-slate-400">{formData.message.length}/1000 characters</p>
      </div>
    </div>
  )
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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  // Two-stage form state (mobile only)
  const [currentStage, setCurrentStage] = useState<1 | 2>(1)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleInputChange =
    (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      // Clear field errors when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
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

  // Validate stage 1 (basic information)
  const validateStage1 = (): boolean => {
    const stage1Data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: "", // Not required for stage 1
    }

    const stage1Schema = z
      .object({
        name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
        email: z.string().email("Invalid email address").optional().or(z.literal("")),
        phone: z.string().optional().or(z.literal("")),
        message: z.string().optional(),
      })
      .refine((data) => data.email || data.phone, {
        message: "Either email or phone number is required",
        path: ["email"],
      })

    const result = stage1Schema.safeParse(stage1Data)

    if (!result.success) {
      const formattedErrors = result.error.format()
      const newErrors: FormErrors = {}

      if (formattedErrors.name?._errors) newErrors.name = formattedErrors.name._errors
      if (formattedErrors.email?._errors) newErrors.email = formattedErrors.email._errors
      if (formattedErrors.phone?._errors) newErrors.phone = formattedErrors.phone._errors
      if (formattedErrors._errors) newErrors.root = formattedErrors._errors

      setErrors(newErrors)
      return false
    }

    setErrors({})
    return true
  }

  // Navigate to next stage
  const handleNext = () => {
    if (validateStage1()) {
      setCurrentStage(2)
    }
  }

  // Navigate to previous stage
  const handleBack = () => {
    setCurrentStage(1)
    setErrors({}) // Clear any stage 2 errors
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
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const result = (await response.json()) as ApiErrorResponse | ApiSuccessResponse
    if (!response.ok) {
      const errorResult = result as ApiErrorResponse
      const err = new Error(errorResult.message || "Failed to send message") as Error & {
        details?: ApiErrorResponse["details"]
      }
      err.details = errorResult.details
      throw err
    }
    return result as ApiSuccessResponse
  }

  const isErrorWithDetails = (e: unknown): e is Error & { details?: ApiErrorResponse["details"] } => {
    return typeof e === "object" && e !== null && "details" in (e as Record<string, unknown>)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const successResult = await sendContactRequest(formData)
      setSubmitStatus("success")
      setSubmitMessage(successResult.message || "Your message has been sent successfully!")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setErrors({})
      // Reset to stage 1 after successful submission
      setCurrentStage(1)
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus("error")
      if (isErrorWithDetails(error)) {
        const mapped = mapServerErrors(error.details)
        if (Object.keys(mapped).length) setErrors(mapped)
      }
      setSubmitMessage(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ...subcomponents moved out of ContactForm to avoid remounting on each render

  return (
    <Card className="mx-auto max-w-2xl border-slate-200/30 bg-slate-50/90 text-slate-900 shadow-xl backdrop-blur supports-[backdrop-filter]:backdrop-blur dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-100">
      <CardHeader className="text-center">
        <CardTitle className="font-serif text-2xl">Contact Us</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-300">
          Get in touch. We'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-live="polite" aria-busy={isSubmitting}>
          {/* Progress indicator for mobile */}
          {isMobile && <ProgressIndicator currentStage={currentStage} />}

          {/* Form fields */}
          {isMobile ? (
            // Mobile: Two-stage layout
            <>
              {currentStage === 1 ? (
                <Stage1Fields
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
              ) : (
                <Stage2Fields
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
              )}
            </>
          ) : (
            // Desktop: Single-stage layout
            <DesktopLayout formData={formData} errors={errors} handleInputChange={handleInputChange} />
          )}

          {/* Error messages */}
          {errors.root && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
              {errors.root.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          {/* Success message */}
          {submitStatus === "success" && (
            <div className="rounded-md border border-green-200 bg-green-50 p-3 text-green-800 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-200">
              {submitMessage}
            </div>
          )}

          {/* Error message */}
          {submitStatus === "error" && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
              {submitMessage}
            </div>
          )}

          {/* Action buttons */}
          {isMobile ? (
            // Mobile: Stage-based navigation
            <div className="flex gap-3">
              {currentStage === 2 && (
                <Button type="button" variant="outline" onClick={handleBack} className="h-12 flex-1">
                  Back
                </Button>
              )}
              {currentStage === 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="h-12 flex-1 bg-yellow-500 text-slate-900 hover:bg-yellow-600"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 flex-1 bg-yellow-500 text-slate-900 hover:bg-yellow-600 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              )}
            </div>
          ) : (
            // Desktop: Single submit button
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full bg-yellow-500 text-slate-900 hover:bg-yellow-600 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          )}

          <p className="text-center text-xs text-slate-600 dark:text-slate-300">
            Prefer email? Write to us at enquiries@wilkieandcojoinery.com
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
