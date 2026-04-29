'use client'
// app/login/page.tsx
import { useState } from 'react'
import { useAuth } from '@/components/AuthContext'
import Link from 'next/link'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const err = await login(email, password)
    if (err) setError(err)
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0f14', padding: 20 }}>
      <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 16, padding: 40, width: '100%', maxWidth: 420 }}>
        <div style={{ color: '#e8ff47', fontWeight: 800, fontSize: 20, marginBottom: 6 }}>🚗 CodeRoute</div>
        <h2 style={{ fontSize: 22, marginBottom: 4 }}>Connexion</h2>
        <p style={{ color: '#6b7394', marginBottom: 28, fontSize: 13 }}>Connectez-vous pour réviser</p>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} placeholder="votre@email.fr" />
          <label style={labelStyle}>Mot de passe</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} placeholder="••••••••" />
          {error && <p style={{ color: '#ff4f4f', fontSize: 13, marginBottom: 14 }}>{error}</p>}
          <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Connexion...' : 'Se connecter →'}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6b7394' }}>
          Pas encore de compte ?{' '}
          <Link href="/register" style={{ color: '#e8ff47', textDecoration: 'none', fontWeight: 600 }}>S'inscrire gratuitement</Link>
        </p>
      </div>
    </main>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, color: '#6b7394', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }
const inputStyle: React.CSSProperties = { width: '100%', background: '#0d0f14', border: '1px solid #2a2f3d', borderRadius: 8, color: '#f0f2f8', padding: '10px 14px', fontSize: 14, marginBottom: 18, outline: 'none', boxSizing: 'border-box' }
const btnStyle: React.CSSProperties = { width: '100%', background: '#e8ff47', color: '#0d0f14', border: 'none', borderRadius: 8, padding: 13, fontWeight: 700, fontSize: 14, cursor: 'pointer' }
