import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    // iCloud SMTP Configuration
    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
    SMTP_USER: z.string().email().optional(),
    SMTP_PASS: z.string().min(1).optional(),
    SMTP_FROM_EMAIL: z.string().email().optional(),
    SMTP_FROM_NAME: z.string().min(1).optional(),
    CONTACT_EMAIL_TO: z.string().email().optional(),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
    SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
    CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
  },
})
