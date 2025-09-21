import { NextRequest } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { env } from "@/env.mjs"
import { isSmtpConfigured, sendContactFormEmails } from "@/lib/email"

// Check if email service is configured (prioritize SMTP, fallback to Resend)
const isConfigured = isSmtpConfigured || (env.RESEND_API_KEY && env.CONTACT_EMAIL_TO)

// Keep Resend as fallback for backwards compatibility
const resend = !isSmtpConfigured && env.RESEND_API_KEY ? 
  new Resend(env.RESEND_API_KEY) : null

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
    // Check if email service is configured
    if (!isConfigured) {
      return Response.json(
        {
          error: "Email service not configured",
          message: isSmtpConfigured 
            ? "SMTP configuration incomplete. Please check environment variables."
            : "Please set SMTP configuration or RESEND_API_KEY and CONTACT_EMAIL_TO environment variables.",
        },
        { status: 500 }
      )
    }

    const body = await request.json()

    // Validate the request body
    const result = contactFormSchema.safeParse(body)

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

    // Use SMTP email service if configured, otherwise fallback to Resend
    if (isSmtpConfigured) {
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
    } else {
      // Fallback to Resend (legacy implementation)
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #555; }
              .value { margin-top: 5px; }
              .message { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007cba; border-radius: 3px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              ${
                email
                  ? `
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              `
                  : ""
              }
              
              ${
                phone
                  ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              `
                  : ""
              }
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="message">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
          </body>
        </html>
      `

      // Send email using Resend
      await resend!.emails.send({
        from: "Contact Form <onboarding@resend.dev>", // Using Resend's default sender for testing
        to: [env.CONTACT_EMAIL_TO!],
        subject: `Contact Form Submission from ${name}`,
        html: htmlContent,
        replyTo: email || undefined, // Set reply-to if email is provided
      })

      return Response.json({
        success: true,
        message: "Your message has been sent successfully!",
      })
    }
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
