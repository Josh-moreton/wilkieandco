/**
 * Simple in-memory rate limiter
 * Suitable for single-instance applications
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

class InMemoryRateLimiter {
  private requests = new Map<string, RateLimitEntry>()
  private readonly maxRequests: number
  private readonly windowMs: number

  constructor(maxRequests: number = 3, windowMs: number = 60000) {
    this.maxRequests = maxRequests
    this.windowMs = windowMs
    
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  isAllowed(identifier: string): { allowed: boolean; resetTime?: number; remaining?: number } {
    const now = Date.now()
    const entry = this.requests.get(identifier)

    if (!entry || now > entry.resetTime) {
      // No entry or window has expired - allow request and create new entry
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      })
      return { allowed: true, remaining: this.maxRequests - 1 }
    }

    if (entry.count >= this.maxRequests) {
      // Rate limit exceeded
      return { 
        allowed: false, 
        resetTime: entry.resetTime,
        remaining: 0
      }
    }

    // Increment count and allow request
    entry.count++
    return { 
      allowed: true, 
      remaining: this.maxRequests - entry.count 
    }
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key)
      }
    }
  }
}

// Create a global rate limiter instance
// 3 requests per minute per IP address
export const contactFormRateLimiter = new InMemoryRateLimiter(3, 60000)

/**
 * Extract client IP address from request
 */
export function getClientIP(request: Request): string {
  // Try various headers for IP address
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  if (cfConnectingIP) {
    return cfConnectingIP.trim()
  }

  // Fallback - in development this will be undefined
  return 'unknown'
}

/**
 * Basic input sanitization for form data
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    // Remove potentially dangerous HTML/script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    // Limit length to prevent abuse
    .slice(0, 2000)
}

/**
 * Check for suspicious patterns that might indicate spam or abuse
 */
export function detectSpamPatterns(text: string): boolean {
  const spamPatterns = [
    // Multiple URLs
    /(https?:\/\/[^\s]+.*){3,}/i,
    // Excessive repetition
    /(.)\1{10,}/,
    // Common spam phrases
    /\b(viagra|cialis|casino|lottery|winner|congratulations|urgent|act now)\b/i,
    // Phone number patterns that might be spam (excessive digits)
    /\d{15,}/,
    // Excessive caps
    /[A-Z]{20,}/,
  ]

  return spamPatterns.some(pattern => pattern.test(text))
}

/**
 * Validate email format more strictly
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

/**
 * Validate phone number format (basic)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true // Phone is optional
  
  // Remove all non-digit characters for validation
  const cleaned = phone.replace(/\D/g, '')
  
  // UK phone numbers: 10-11 digits, international: 7-15 digits
  return cleaned.length >= 7 && cleaned.length <= 15
}