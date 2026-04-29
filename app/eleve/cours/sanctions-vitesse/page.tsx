'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user])

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px 80px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      <button onClick={() => router.push('/eleve/cours')} style={backBtn}>← Retour aux fiches</button>

      <div style={{ marginTop: 20, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={badge}>Fiche 57</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>Réglementation et Accidents</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Sanctions vitesse</h1>
      </div>

      <SectionBlock>
        <p style={text}>Contenu du cours en cours de rédaction...</p>
      </SectionBlock>
    </div>
  )
}

const SectionBlock = ({ children }: { children: React.ReactNode }) => (
  <div style={{ marginBottom: 28 }}>{children}</div>
)

const backBtn = {
  background: '#1e2230',
  color: '#f0f2f8',
  border: '1px solid #2a2f3d',
  borderRadius: 8,
  padding: '9px 16px',
  fontWeight: 600,
  fontSize: 13,
  cursor: 'pointer'
}

const badge = {
  background: '#06b6d4',
  color: '#fff',
  fontSize: 11,
  fontWeight: 700,
  padding: '4px 10px',
  borderRadius: 6
}

const text = {
  fontSize: 15,
  lineHeight: 1.7,
  color: '#d0d2e0',
  marginBottom: 14
}
