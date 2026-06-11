import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Muhammad Abdullah — Full Stack Developer',
    template: '%s | Muhammad Abdullah',
  },
  description: 'Full Stack Developer & IT Student specializing in React, Next.js, Node.js, NestJS, Python, and AI solutions.',
  keywords: ['Muhammad Abdullah', 'Full Stack Developer', 'React', 'Next.js', 'Node.js', 'AI Engineer'],
  authors: [{ name: 'Muhammad Abdullah' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Muhammad Abdullah — Full Stack Developer',
    description: 'Building scalable web applications and AI-powered solutions.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-base text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  )
}
