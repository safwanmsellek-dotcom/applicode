'use client'
// app/admin/page.tsx
import { useEffect, useState } from 'react'
import { useAuth, useApi } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

interface Stats {
  totalEleves: number
  elevesActifs: number
  totalQuestions: number
  totalThemes: number
  totalResultats: number
  parTheme: Record<string, number>
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const api = useApi()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    if (user.role !== 'admin') { router.push('/eleve'); return }
    api('/api/admin/stats').then(r => r.json()).then(setStats)
  }, [user])

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ color: '#e8ff47', fontSize: 26, marginBottom: 4 }}>⚙️ Administration</h1>
          <p style={{ color: '#6b7394', fontSize: 14 }}>Bienvenue, {user?.prenom}</p>
        </div>
        <button onClick={logout} style={btnSecStyle}>Déconnexion</button>
      </div>

      {/* Stats cards */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Questions', value: stats.totalQuestions, color: '#e8ff47' },
            { label: 'Thèmes', value: stats.totalThemes, color: '#4f6ef7' },
            { label: 'Élèves', value: stats.totalEleves, color: '#f0f2f8' },
            { label: 'Actifs', value: stats.elevesActifs, color: '#3dffa0' },
            { label: 'Séries jouées', value: stats.totalResultats, color: '#f0f2f8' },
          ].map(s => (
            <div key={s.label} style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 12, color: '#6b7394', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { icon: '📝', title: 'Questions', desc: 'Ajouter, modifier, supprimer les questions', path: '/admin/questions' },
          { icon: '👥', title: 'Élèves', desc: 'Gérer les comptes élèves', path: '/admin/eleves' },
          { icon: '🏷️', title: 'Thèmes', desc: 'Gérer les thèmes / catégories', path: '/admin/themes' },
        ].map(item => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            style={{
              background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12,
              padding: 24, textAlign: 'left', cursor: 'pointer', color: '#f0f2f8',
              transition: 'border-color .2s'
            }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#4f6ef7')}
            onMouseOut={e => (e.currentTarget.style.borderColor = '#2a2f3d')}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: '#6b7394' }}>{item.desc}</div>
          </button>
        ))}
      </div>

      {/* Questions par thème */}
      {stats && Object.keys(stats.parTheme).length > 0 && (
        <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, marginBottom: 20 }}>Questions par thème</h2>
          {Object.entries(stats.parTheme).sort((a, b) => b[1] - a[1]).map(([nom, count]) => {
            const pct = Math.round(count / stats.totalQuestions * 100)
            return (
              <div key={nom} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                  <span>{nom}</span>
                  <span style={{ color: '#6b7394' }}>{count} question(s)</span>
                </div>
                <div style={{ background: '#0d0f14', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: '#4f6ef7', borderRadius: 99, transition: 'width .4s' }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const btnSecStyle: React.CSSProperties = {
  background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d',
  borderRadius: 8, padding: '10px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer'
}
