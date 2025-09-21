import nodemailer from "nodemailer"
import { env } from "@/env.mjs"

export interface ContactFormData {
  name: string
  email?: string
  phone?: string
  message: string
  serviceType?: string
}

export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
  from: {
    email: string
    name: string
  }
}

// Check if SMTP is configured
export const isSmtpConfigured = !!(
  env.SMTP_HOST &&
  env.SMTP_PORT &&
  env.SMTP_USER &&
  env.SMTP_PASS &&
  env.SMTP_FROM_EMAIL &&
  env.SMTP_FROM_NAME &&
  env.CONTACT_EMAIL_TO
)

// Create nodemailer transporter for iCloud SMTP
export const createTransporter = () => {
  if (!isSmtpConfigured) {
    throw new Error("SMTP configuration is incomplete")
  }

  return nodemailer.createTransporter({
    host: env.SMTP_HOST!,
    port: env.SMTP_PORT!,
    secure: false, // true for 465, false for other ports like 587
    auth: {
      user: env.SMTP_USER!,
      pass: env.SMTP_PASS!,
    },
    tls: {
      // Enable TLS encryption
      rejectUnauthorized: false, // Allow self-signed certificates (common with iCloud)
    },
  })
}

// Send customer confirmation email
export async function sendCustomerConfirmationEmail(data: ContactFormData) {
  const transporter = createTransporter()
  
  const customerHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Wilkie & Co</title>
        <style>
          body { 
            font-family: 'Open Sans', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1e293b; 
            margin: 0; 
            padding: 0; 
            background-color: #f8fafc;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white; 
            padding: 40px 30px; 
            text-align: center;
          }
          .logo { 
            font-family: 'Playfair Display', serif; 
            font-size: 32px; 
            font-weight: 700; 
            margin-bottom: 8px;
            letter-spacing: -0.025em;
          }
          .tagline { 
            color: #fbbf24; 
            font-size: 14px; 
            text-transform: uppercase; 
            letter-spacing: 0.1em;
            margin: 0;
          }
          .content { 
            padding: 40px 30px; 
          }
          .greeting { 
            font-size: 24px; 
            color: #0f172a; 
            margin-bottom: 20px;
            font-weight: 600;
          }
          .message { 
            font-size: 16px; 
            line-height: 1.6; 
            margin-bottom: 30px; 
            color: #475569;
          }
          .details-box { 
            background-color: #f1f5f9; 
            border-left: 4px solid #fbbf24; 
            padding: 20px; 
            margin: 30px 0;
            border-radius: 0 4px 4px 0;
          }
          .details-title { 
            font-size: 18px; 
            font-weight: 600; 
            color: #0f172a; 
            margin-bottom: 15px;
          }
          .detail-item { 
            margin-bottom: 10px; 
          }
          .detail-label { 
            font-weight: 600; 
            color: #374151; 
            display: inline-block;
            min-width: 80px;
          }
          .detail-value { 
            color: #1e293b; 
          }
          .next-steps { 
            background-color: #fef3c7; 
            border: 1px solid #fbbf24; 
            padding: 20px; 
            border-radius: 6px; 
            margin: 30px 0;
          }
          .next-steps-title { 
            font-size: 16px; 
            font-weight: 600; 
            color: #92400e; 
            margin-bottom: 10px;
          }
          .next-steps-text { 
            color: #78350f; 
            font-size: 14px;
          }
          .footer { 
            background-color: #f8fafc; 
            padding: 30px; 
            text-align: center; 
            border-top: 1px solid #e2e8f0;
          }
          .footer-text { 
            color: #64748b; 
            font-size: 14px; 
            margin: 5px 0;
          }
          .contact-info { 
            color: #475569; 
            font-size: 13px; 
            margin-top: 15px;
          }
          @media only screen and (max-width: 600px) {
            .container { margin: 0; }
            .header, .content, .footer { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Wilkie & Co</div>
            <p class="tagline">Bespoke Joinery & Furniture</p>
          </div>
          
          <div class="content">
            <h1 class="greeting">Thank you, ${data.name}!</h1>
            
            <div class="message">
              We've successfully received your enquiry and appreciate you taking the time to contact us. 
              Our team will review your message and get back to you as soon as possible.
            </div>
            
            <div class="details-box">
              <div class="details-title">Your Submission Details:</div>
              <div class="detail-item">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${data.name}</span>
              </div>
              ${data.email ? `
              <div class="detail-item">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${data.email}</span>
              </div>
              ` : ''}
              ${data.phone ? `
              <div class="detail-item">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${data.phone}</span>
              </div>
              ` : ''}
              <div class="detail-item">
                <span class="detail-label">Message:</span>
                <div class="detail-value" style="margin-top: 8px;">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            
            <div class="next-steps">
              <div class="next-steps-title">What happens next?</div>
              <div class="next-steps-text">
                Our team typically responds within 24-48 hours during business days. 
                We'll be in touch to discuss your project requirements and arrange a consultation if needed.
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-text">This is an automated confirmation email.</div>
            <div class="contact-info">
              Wilkie & Co Joinery<br>
              Email: enquiries@wilkieandcojoinery.com<br>
              For urgent enquiries, please call us directly.
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  const mailOptions = {
    from: `"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM_EMAIL}>`,
    to: data.email,
    subject: "Thank you for your enquiry - Wilkie & Co",
    html: customerHtml,
  }

  return await transporter.sendMail(mailOptions)
}

// Send internal notification email
export async function sendInternalNotificationEmail(data: ContactFormData) {
  const transporter = createTransporter()
  
  const internalHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - Wilkie & Co</title>
        <style>
          body { 
            font-family: 'Open Sans', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1e293b; 
            margin: 0; 
            padding: 0; 
            background-color: #f8fafc;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white; 
            padding: 30px; 
            text-align: center;
          }
          .alert-title { 
            font-size: 24px; 
            font-weight: 700; 
            margin: 0;
          }
          .alert-subtitle { 
            color: #fecaca; 
            font-size: 14px; 
            margin: 8px 0 0 0;
          }
          .content { 
            padding: 30px; 
          }
          .priority-high { 
            background-color: #fef2f2; 
            border: 1px solid #fecaca; 
            color: #b91c1c; 
            padding: 15px; 
            border-radius: 6px; 
            margin-bottom: 25px; 
            text-align: center; 
            font-weight: 600;
          }
          .submission-details { 
            background-color: #f8fafc; 
            border: 1px solid #e2e8f0; 
            border-radius: 8px; 
            overflow: hidden; 
            margin: 25px 0;
          }
          .section-header { 
            background-color: #0f172a; 
            color: white; 
            padding: 15px 20px; 
            font-size: 16px; 
            font-weight: 600; 
            margin: 0;
          }
          .field-row { 
            padding: 15px 20px; 
            border-bottom: 1px solid #e2e8f0; 
            display: flex; 
            align-items: flex-start;
          }
          .field-row:last-child { 
            border-bottom: none; 
          }
          .field-label { 
            font-weight: 600; 
            color: #374151; 
            min-width: 100px; 
            margin-right: 15px;
          }
          .field-value { 
            color: #1e293b; 
            flex: 1;
          }
          .message-content { 
            background-color: #f1f5f9; 
            padding: 15px; 
            border-left: 4px solid #fbbf24; 
            border-radius: 0 4px 4px 0; 
            margin-top: 10px;
          }
          .timestamp { 
            text-align: center; 
            color: #64748b; 
            font-size: 13px; 
            margin: 20px 0;
          }
          .action-buttons { 
            text-align: center; 
            margin: 30px 0;
          }
          .btn { 
            display: inline-block; 
            padding: 12px 24px; 
            margin: 0 10px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600; 
            font-size: 14px;
          }
          .btn-primary { 
            background-color: #fbbf24; 
            color: #1e293b;
          }
          .btn-secondary { 
            background-color: #e2e8f0; 
            color: #475569;
          }
          @media only screen and (max-width: 600px) {
            .container { margin: 0; }
            .header, .content { padding: 20px; }
            .field-row { flex-direction: column; }
            .field-label { margin-bottom: 5px; min-width: auto; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="alert-title">🔔 New Enquiry Received</h1>
            <p class="alert-subtitle">Contact form submission from your website</p>
          </div>
          
          <div class="content">
            <div class="priority-high">
              ⚡ New Lead Alert - Response Required
            </div>
            
            <div class="submission-details">
              <h2 class="section-header">Contact Information</h2>
              
              <div class="field-row">
                <div class="field-label">Name:</div>
                <div class="field-value">${data.name}</div>
              </div>
              
              ${data.email ? `
              <div class="field-row">
                <div class="field-label">Email:</div>
                <div class="field-value">
                  <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                </div>
              </div>
              ` : ''}
              
              ${data.phone ? `
              <div class="field-row">
                <div class="field-label">Phone:</div>
                <div class="field-value">
                  <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
                </div>
              </div>
              ` : ''}
              
              <div class="field-row">
                <div class="field-label">Message:</div>
                <div class="field-value">
                  <div class="message-content">${data.message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
            
            <div class="timestamp">
              Received: ${new Date().toLocaleString('en-GB', { 
                timeZone: 'Europe/London',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            
            <div class="action-buttons">
              ${data.email ? `
              <a href="mailto:${data.email}?subject=Re: Your enquiry - Wilkie & Co" class="btn btn-primary">
                Reply to Customer
              </a>
              ` : ''}
              ${data.phone ? `
              <a href="tel:${data.phone}" class="btn btn-secondary">
                Call Customer
              </a>
              ` : ''}
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  const mailOptions = {
    from: `"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM_EMAIL}>`,
    to: env.CONTACT_EMAIL_TO!,
    subject: `🔔 New Contact Form Submission from ${data.name}`,
    html: internalHtml,
  }

  return await transporter.sendMail(mailOptions)
}

// Send both emails
export async function sendContactFormEmails(data: ContactFormData) {
  const results = []
  
  try {
    // Send internal notification (always send this)
    const internalResult = await sendInternalNotificationEmail(data)
    results.push({ type: 'internal', success: true, result: internalResult })
    
    // Send customer confirmation only if email is provided
    if (data.email) {
      const customerResult = await sendCustomerConfirmationEmail(data)
      results.push({ type: 'customer', success: true, result: customerResult })
    }
    
    return {
      success: true,
      results,
      message: data.email 
        ? 'Both internal notification and customer confirmation emails sent successfully'
        : 'Internal notification email sent successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email sending error',
      results
    }
  }
}