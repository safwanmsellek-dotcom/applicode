// app/layout.tsx
import type { Metadata } from 'next'
import { AuthProvider } from '@/components/AuthContext'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeRoute — Entraînement Code de la Route',
  description: 'Plateforme de révision du code de la route pour élèves.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  )
}
