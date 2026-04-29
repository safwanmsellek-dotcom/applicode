'use client'
// app/register/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', password: '', confirm: '', numero_dossier: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas'); return }
    if (form.password.length < 6) { setError('Mot de passe trop court (6 caractères min)'); return }
    if (form.numero_dossier && !/^\d{12}$/.test(form.numero_dossier)) { setError('Le n° NEPH doit contenir exactement 12 chiffres'); return }
    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prenom: form.prenom, nom: form.nom, email: form.email, password: form.password, numero_dossier: form.numero_dossier || undefined }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Erreur'); setLoading(false); return }
    // Sauvegarder le token et rediriger
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/eleve')
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0f14', padding: 20 }}>
      <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 16, padding: 40, width: '100%', maxWidth: 440 }}>
        <div style={{ color: '#e8ff47', fontWeight: 800, fontSize: 20, marginBottom: 6 }}>🚗 CodeRoute</div>
        <h2 style={{ fontSize: 22, marginBottom: 4 }}>Créer un compte</h2>
        <p style={{ color: '#6b7394', fontSize: 13, marginBottom: 28 }}>Rejoignez la plateforme gratuitement</p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelSt}>Prénom</label>
              <input value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} required style={inputSt} placeholder="Marie" />
            </div>
            <div>
              <label style={labelSt}>Nom</label>
              <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required style={inputSt} placeholder="Dupont" />
            </div>
          </div>

          <label style={labelSt}>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={inputSt} placeholder="votre@email.fr" />

          <label style={labelSt}>N° NEPH (optionnel)</label>
          <input
            value={form.numero_dossier}
            onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 12); setForm({ ...form, numero_dossier: v }) }}
            style={inputSt}
            placeholder="12 chiffres — ex: 230160000001"
            inputMode="numeric"
            maxLength={12}
          />
          {form.numero_dossier && form.numero_dossier.length !== 12 && (
            <p style={{ color: '#ff9f4f', fontSize: 11, marginTop: -12, marginBottom: 14 }}>{form.numero_dossier.length}/12 chiffres</p>
          )}

          <label style={labelSt}>Mot de passe</label>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={inputSt} placeholder="6 caractères minimum" />

          <label style={labelSt}>Confirmer le mot de passe</label>
          <input type="password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required style={inputSt} placeholder="••••••••" />

          {error && <p style={{ color: '#ff4f4f', fontSize: 13, marginBottom: 14 }}>{error}</p>}

          <button type="submit" disabled={loading} style={btnSt}>
            {loading ? 'Création...' : "Créer mon compte →"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6b7394' }}>
          Déjà un compte ?{' '}
          <Link href="/login" style={{ color: '#e8ff47', textDecoration: 'none', fontWeight: 600 }}>Se connecter</Link>
        </p>
      </div>
    </main>
  )
}

const labelSt: React.CSSProperties = { display: 'block', fontSize: 12, color: '#6b7394', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }
const inputSt: React.CSSProperties = { width: '100%', background: '#0d0f14', border: '1px solid #2a2f3d', borderRadius: 8, color: '#f0f2f8', padding: '10px 14px', fontSize: 14, marginBottom: 16, outline: 'none', boxSizing: 'border-box' }
const btnSt: React.CSSProperties = { width: '100%', background: '#e8ff47', color: '#0d0f14', border: 'none', borderRadius: 8, padding: 13, fontWeight: 700, fontSize: 14, cursor: 'pointer' }
