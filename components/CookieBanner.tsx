'use client'
// components/CookieBanner.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#161920', borderTop: '1px solid #2a2f3d',
      padding: '16px 24px', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 12, fontFamily: 'sans-serif',
    }}>
      <p style={{ color: '#f0f2f8', fontSize: 13, maxWidth: 700, margin: 0 }}>
        🍪 Nous utilisons des cookies pour améliorer votre expérience et analyser l'utilisation de la plateforme.{' '}
        <Link href="/mentions-legales" style={{ color: '#e8ff47', textDecoration: 'none' }}>En savoir plus</Link>
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={decline} style={{ background: 'transparent', border: '1px solid #2a2f3d', borderRadius: 7, color: '#6b7394', padding: '8px 16px', fontSize: 13, cursor: 'pointer' }}>
          Refuser
        </button>
        <button onClick={accept} style={{ background: '#e8ff47', border: 'none', borderRadius: 7, color: '#0d0f14', padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          Accepter
        </button>
      </div>
    </div>
  )
}
