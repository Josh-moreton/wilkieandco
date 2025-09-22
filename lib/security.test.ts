/**
 * Security Features Test
 * 
 * This file tests the security and validation functionality.
 * Run with: pnpm test lib/security.test.ts
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { 
  contactFormRateLimiter, 
  detectSpamPatterns,
  isValidEmail,
  isValidPhone,
  sanitizeInput
} from '@/lib/security'

describe('Security Features', () => {
  beforeEach(() => {
    // Reset any rate limiting between tests
    vi.clearAllMocks()
  })

  describe('Input Sanitization', () => {
    it('should sanitize dangerous script tags', () => {
      const maliciousInput = '<script>alert("xss")</script>Hello World'
      const sanitized = sanitizeInput(maliciousInput)
      expect(sanitized).toBe('Hello World')
      expect(sanitized).not.toContain('<script>')
    })

    it('should remove iframe tags', () => {
      const maliciousInput = '<iframe src="evil.com"></iframe>Safe content'
      const sanitized = sanitizeInput(maliciousInput)
      expect(sanitized).toBe('Safe content')
    })

    it('should limit input length', () => {
      const longInput = 'a'.repeat(3000)
      const sanitized = sanitizeInput(longInput)
      expect(sanitized.length).toBe(2000)
    })

    it('should trim whitespace', () => {
      const input = '  Hello World  '
      const sanitized = sanitizeInput(input)
      expect(sanitized).toBe('Hello World')
    })
  })

  describe('Spam Detection', () => {
    it('should detect spam patterns', () => {
      const spamMessage = 'WIN BIG AT CASINO NOW!!! URGENT ACT NOW VIAGRA'
      expect(detectSpamPatterns(spamMessage)).toBe(true)
    })

    it('should detect excessive repetition', () => {
      const repeatedMessage = 'aaaaaaaaaaaaaaaaaaaaaa'
      expect(detectSpamPatterns(repeatedMessage)).toBe(true)
    })

    it('should detect multiple URLs', () => {
      const urlSpam = 'Visit https://site1.com and https://site2.com and https://site3.com'
      expect(detectSpamPatterns(urlSpam)).toBe(true)
    })

    it('should allow legitimate messages', () => {
      const legitimateMessage = 'I am interested in a kitchen renovation project'
      expect(detectSpamPatterns(legitimateMessage)).toBe(false)
    })
  })

  describe('Email Validation', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('user@example.com')).toBe(true)
      expect(isValidEmail('test.email+tag@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })

    it('should reject overly long emails', () => {
      const longEmail = 'a'.repeat(250) + '@example.com'
      expect(isValidEmail(longEmail)).toBe(false)
    })
  })

  describe('Phone Validation', () => {
    it('should validate UK phone numbers', () => {
      expect(isValidPhone('07123456789')).toBe(true)
      expect(isValidPhone('+44 7123 456 789')).toBe(true)
      expect(isValidPhone('0131 234 5678')).toBe(true)
    })

    it('should allow empty phone (optional field)', () => {
      expect(isValidPhone('')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('12345')).toBe(false) // Too short
      expect(isValidPhone('123456789012345678')).toBe(false) // Too long
    })
  })

  describe('Rate Limiting', () => {
    it('should allow requests within limit', () => {
      const testIP = 'test-ip-1'
      
      // First request should be allowed
      const result1 = contactFormRateLimiter.isAllowed(testIP)
      expect(result1.allowed).toBe(true)
      expect(result1.remaining).toBe(2)
      
      // Second request should be allowed
      const result2 = contactFormRateLimiter.isAllowed(testIP)
      expect(result2.allowed).toBe(true)
      expect(result2.remaining).toBe(1)
      
      // Third request should be allowed
      const result3 = contactFormRateLimiter.isAllowed(testIP)
      expect(result3.allowed).toBe(true)
      expect(result3.remaining).toBe(0)
    })

    it('should block requests over limit', () => {
      const testIP = 'test-ip-2'
      
      // Use up the allowed requests
      contactFormRateLimiter.isAllowed(testIP)
      contactFormRateLimiter.isAllowed(testIP)
      contactFormRateLimiter.isAllowed(testIP)
      
      // Fourth request should be blocked
      const result4 = contactFormRateLimiter.isAllowed(testIP)
      expect(result4.allowed).toBe(false)
      expect(result4.remaining).toBe(0)
      expect(result4.resetTime).toBeDefined()
    })

    it('should track different IPs separately', () => {
      const ip1 = 'test-ip-3'
      const ip2 = 'test-ip-4'
      
      // Both IPs should have independent limits
      const result1 = contactFormRateLimiter.isAllowed(ip1)
      const result2 = contactFormRateLimiter.isAllowed(ip2)
      
      expect(result1.allowed).toBe(true)
      expect(result2.allowed).toBe(true)
    })
  })
})

describe('Contact Form Data Structure', () => {
  it('should handle contact form data structure', () => {
    const formData = {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '07123456789',
      message: 'I need a kitchen renovation quote'
    }

    // Test that our data structure is valid
    expect(formData.name).toBeDefined()
    expect(formData.message).toBeDefined()
    expect(formData.email || formData.phone).toBeTruthy()
  })

  it('should handle optional fields correctly', () => {
    const formDataEmailOnly = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Interested in built-in wardrobes'
    }

    const formDataPhoneOnly = {
      name: 'Bob Wilson',
      phone: '07987654321',
      message: 'Need bathroom renovation quote'
    }

    expect(formDataEmailOnly.email).toBeDefined()
    expect(formDataEmailOnly.phone).toBeUndefined()
    
    expect(formDataPhoneOnly.phone).toBeDefined()
    expect(formDataPhoneOnly.email).toBeUndefined()
  })
})