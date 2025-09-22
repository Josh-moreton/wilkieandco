import { NextRequest } from "next/server"
import { z } from "zod"
import { isSmtpConfigured, sendContactFormEmails } from "@/lib/email"
import {
  contactFormRateLimiter,
  detectSpamPatterns,
  getClientIP,
  isValidEmail,
  isValidPhone,
  sanitizeInput
} from "@/lib/security"

// Check if email service is configured
const isConfigured = isSmtpConfigured

// Validation schema for contact form
const contactFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().optional().or(z.literal("")),
    message: z.string().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone number is required",
    path: ["email"], // This will show the error on the email field
  })

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request)
    const rateLimitResult = contactFormRateLimiter.isAllowed(clientIP)

    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime ? new Date(rateLimitResult.resetTime).toISOString() : 'unknown'
      return Response.json(
        {
          error: "Rate limit exceeded",
          message: "Too many requests. Please wait before submitting again.",
          resetTime,
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.resetTime ?
              Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString() : '60'
          }
        }
      )
    }

    // Check if email service is configured
    if (!isConfigured) {
      return Response.json(
        {
          error: "Email service not configured",
          message: "Please set SMTP configuration environment variables.",
        },
        { status: 500 }
      )
    }

    const raw = await request.json()

    // Basic security: limit request size
    const requestSize = JSON.stringify(raw).length
    if (requestSize > 10000) { // 10KB limit
      return Response.json(
        {
          error: "Request too large",
          message: "Please reduce the length of your message.",
        },
        { status: 413 }
      )
    }

    // Sanitize inputs before validation (with runtime type guards)
    const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null
    const input = isRecord(raw) ? raw : {}
    const sanitized = {
      name: typeof input.name === "string" ? sanitizeInput(input.name) : input.name,
      email: typeof input.email === "string" ? sanitizeInput(input.email) : input.email,
      phone: typeof input.phone === "string" ? sanitizeInput(input.phone) : input.phone,
      message: typeof input.message === "string" ? sanitizeInput(input.message) : input.message,
    }

    // Validate the request body
    const result = contactFormSchema.safeParse(sanitized)

    if (!result.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: result.error.format(),
        },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = result.data

    // Additional security validations
    if (email && !isValidEmail(email)) {
      return Response.json(
        {
          error: "Invalid email format",
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      )
    }

    if (phone && !isValidPhone(phone)) {
      return Response.json(
        {
          error: "Invalid phone format",
          message: "Please provide a valid phone number.",
        },
        { status: 400 }
      )
    }

    // Spam detection
    const combinedText = `${name} ${email} ${phone} ${message}`
    if (detectSpamPatterns(combinedText)) {
      console.warn(`Potential spam detected from IP ${clientIP}:`, { name, email, phone })
      return Response.json(
        {
          error: "Message blocked",
          message: "Your message appears to contain suspicious content. Please contact us directly if this is a legitimate enquiry.",
        },
        { status: 400 }
      )
    }

    // Send email using SMTP
    const emailResult = await sendContactFormEmails({
      name,
      email,
      phone,
      message,
    })

    if (!emailResult.success) {
      console.error("SMTP email sending failed:", emailResult.error)
      return Response.json(
        {
          error: "Failed to send email",
          message: "We encountered an issue sending your message. Please try again or contact us directly.",
        },
        { status: 500 }
      )
    }

    return Response.json(
      {
        success: true,
        message: "Your message has been sent successfully! We'll get back to you soon.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)

    return Response.json(
      {
        error: "Failed to send message",
        message: "Please try again later or contact us directly.",
      },
      { status: 500 }
    )
  }
}
