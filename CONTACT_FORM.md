# Contact Form Implementation

This document describes the contact form implementation added to the Next.js Enterprise Boilerplate.

## Overview

The contact form allows users to get in touch by providing their name, contact information (email or phone), and a message. The form includes client-side validation, server-side validation, and email delivery using Resend.

## Features

### Form Fields

- **Name** (required): User's full name
- **Email** (optional): User's email address
- **Phone** (optional): User's phone number
- **Message** (required): User's message

### Validation Rules

- Name and Message are required fields
- At least one of Email or Phone must be provided
- Email format validation when provided
- Character limit for all fields (Name: 100, Message: 1000)

### Email Delivery

- HTML-formatted emails sent via Resend
- Professional email template with proper styling
- Reply-to header set to user's email when provided
- Configurable recipient email address

## Files Added/Modified

### New Files

- `/app/contact/page.tsx` - Contact page component
- `/app/api/contact/route.ts` - API endpoint for form submissions
- `/components/ContactForm/ContactForm.tsx` - Main contact form component
- `/components/ui/textarea.tsx` - Textarea UI component
- `/.env.local.example` - Environment variables template

### Modified Files

- `/app/page.tsx` - Added "Contact Us" button
- `/components/ui/index.ts` - Exported new Textarea component
- `/env.mjs` - Added contact form environment variables
- `/package.json` - Added Resend dependency

## Environment Variables

The contact form requires the following environment variables:

```bash
# Required for production
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL_TO=recipient@example.com

# Optional - for build analysis
ANALYZE=false
```

### Development Setup

1. Copy the example environment file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Update the environment variables with your values:

   - Get a Resend API key from https://resend.com
   - Set the recipient email address

3. The form will show an error message if environment variables are not configured

## Usage

### Accessing the Contact Form

1. **From Homepage**: Click the "Contact Us" button on the main page
2. **Direct URL**: Navigate to `/contact`

### Form Submission Flow

1. User fills out the form with required information
2. Client-side validation checks for errors
3. Form data is sent to `/api/contact` endpoint
4. Server validates the data again
5. Email is sent via Resend service
6. Success/error message is displayed to user

## Technical Implementation

### Client-Side Features

- Real-time validation feedback
- Character counting for message field
- Loading states during submission
- Error and success message display
- Form reset after successful submission

### Server-Side Features

- Zod schema validation
- HTML email template generation
- Error handling and logging
- Environment variable validation

### UI Components

- Built with shadcn/ui components
- Consistent design with existing site
- Responsive layout
- Accessible form elements

## Error Handling

The contact form includes comprehensive error handling:

### Client-Side Errors

- Field validation errors (required fields, email format)
- Network connectivity issues
- Server response errors

### Server-Side Errors

- Missing environment variables
- Invalid form data
- Email service failures
- Network timeouts

## Security Considerations

- Server-side validation prevents malicious input
- Environment variables protect sensitive API keys
- CORS protection through Next.js API routes
- Input sanitization in email templates
- Rate limiting can be added as needed

## Deployment

### Vercel Deployment

1. Add environment variables in Vercel dashboard
2. Deploy the application
3. Test the contact form in production

### Other Platforms

1. Ensure environment variables are set
2. Verify Resend API access
3. Test email delivery

## Customization

### Styling

- Modify `/components/ContactForm/ContactForm.tsx` for layout changes
- Update `/components/ui/` components for design system changes
- Customize email template in `/app/api/contact/route.ts`

### Validation

- Update Zod schemas in both client and server files
- Modify validation messages as needed
- Add additional field validation rules

### Email Template

- Customize HTML template in the API route
- Add company branding
- Modify email subject lines

## Troubleshooting

### Common Issues

1. **Environment Variables Not Set**

   - Error: "Email service not configured"
   - Solution: Set RESEND_API_KEY and CONTACT_EMAIL_TO in .env.local

2. **Email Not Sending**

   - Check Resend API key validity
   - Verify recipient email address
   - Check server logs for errors

3. **Validation Errors**
   - Ensure form data matches schema requirements
   - Check client-side validation logic
   - Verify server-side validation

### Development Tips

1. Use browser dev tools to inspect form submission
2. Check Next.js server logs for API errors
3. Test with invalid data to verify validation
4. Use Resend dashboard to monitor email delivery

## Future Enhancements

Potential improvements that could be added:

1. **Rate Limiting**: Prevent spam submissions
2. **Captcha Integration**: Additional spam protection
3. **File Attachments**: Allow users to upload files
4. **Auto-Reply**: Send confirmation emails to users
5. **Database Storage**: Store submissions for tracking
6. **Analytics**: Track form submission metrics
7. **Multiple Recipients**: Route to different departments
8. **Templates**: Multiple email templates for different purposes
