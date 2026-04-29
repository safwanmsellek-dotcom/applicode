'use client'
// app/admin/themes/page.tsx
import { useEffect, useState } from 'react'
import { useAuth, useApi } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

interface Theme { id: number; nom: string }

export default function AdminThemesPage() {
  const { user } = useAuth()
  const api = useApi()
  const router = useRouter()
  const [themes, setThemes] = useState<Theme[]>([])
  const [nom, setNom] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    if (user.role !== 'admin') { router.push('/eleve'); return }
    loadThemes()
  }, [user])

  const loadThemes = async () => {
    const res = await api('/api/themes')
    if (res.ok) setThemes(await res.json())
  }

  const addTheme = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nom.trim()) return
    const res = await api('/api/themes', { method: 'POST', body: JSON.stringify({ nom }) })
    const data = await res.json()
    if (res.ok) { setMsg('✅ Thème ajouté'); setNom(''); loadThemes() }
    else setMsg('❌ ' + data.error)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ color: '#e8ff47', fontSize: 24 }}>🏷️ Thèmes</h1>
        <button onClick={() => router.push('/admin')} style={btnSecStyle}>← Dashboard</button>
      </div>

      {msg && <div style={{ background: '#1e2230', border: '1px solid #2a2f3d', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14 }}>{msg}</div>}

      <form onSubmit={addTheme} style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        <input
          value={nom}
          onChange={e => setNom(e.target.value)}
          placeholder="Nom du nouveau thème..."
          required
          style={{ flex: 1, background: '#0d0f14', border: '1px solid #2a2f3d', borderRadius: 8, color: '#f0f2f8', padding: '10px 14px', fontSize: 14, outline: 'none' }}
        />
        <button type="submit" style={btnPrimStyle}>+ Ajouter</button>
      </form>

      <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, overflow: 'hidden' }}>
        {themes.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: '#6b7394' }}>Aucun thème</div>
        )}
        {themes.map((t, i) => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: i < themes.length - 1 ? '1px solid #1e2230' : 'none', gap: 12 }}>
            <span style={{ background: '#0d0f14', borderRadius: 6, padding: '3px 10px', fontSize: 12, color: '#6b7394' }}>#{t.id}</span>
            <span style={{ flex: 1, fontSize: 15 }}>{t.nom}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const btnPrimStyle: React.CSSProperties = { background: '#e8ff47', color: '#0d0f14', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }
const btnSecStyle: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 8, padding: '10px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }
