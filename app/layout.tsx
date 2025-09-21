import "styles/tailwind.css"
import type { Metadata } from "next"
import { Open_Sans, Playfair_Display } from "next/font/google"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${openSans.variable} ${playfairDisplay.variable}`}>
      <head />
      <body className={openSans.className}>
        {/* Fixed background layer */}
        <div className="fixed inset-0 z-0 h-[100dvh] w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-yellow-500 blur-3xl filter" />
            <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500 blur-3xl filter" />
          </div>
        </div>

        {/* Content layer */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
