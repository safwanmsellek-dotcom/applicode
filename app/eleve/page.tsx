'use client'
// app/eleve/page.tsx
import { useEffect, useState } from 'react'
import { useAuth, useApi } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

interface Theme { id: number; nom: string }
interface Resultat { id: number; mode: string; score: number; total: number; created_at: string }

export default function EleveDashboard() {
  const { user, logout } = useAuth()
  const api = useApi()
  const router = useRouter()
  const [themes, setThemes] = useState<Theme[]>([])
  const [resultats, setResultats] = useState<Resultat[]>([])

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    if (user.role === 'admin') { router.push('/admin'); return }
    api('/api/themes').then(r => r.json()).then(setThemes)
    api('/api/resultats').then(r => r.json()).then(setResultats)
  }, [user])

  const avgScore = resultats.length
    ? Math.round(resultats.reduce((s, r) => s + (r.score / r.total * 100), 0) / resultats.length)
    : null

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ color: '#e8ff47', fontSize: 24, marginBottom: 4 }}>🚗 Bonjour {user?.prenom} !</h1>
          <p style={{ color: '#6b7394', fontSize: 14 }}>Prêt(e) à réviser ?</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={logout} style={btnSecStyle}>Déconnexion</button>
        </div>
      </div>

      {/* Stats */}
      {resultats.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
          <div style={statCard}>
            <div style={statLabel}>Séries faites</div>
            <div style={{ ...statVal, color: '#4f6ef7' }}>{resultats.length}</div>
          </div>
          <div style={statCard}>
            <div style={statLabel}>Moy. générale</div>
            <div style={{ ...statVal, color: avgScore! >= 80 ? '#3dffa0' : '#ff4f4f' }}>{avgScore}%</div>
          </div>
          <div style={statCard}>
            <div style={statLabel}>Dernière série</div>
            <div style={{ ...statVal, color: '#e8ff47' }}>
              {resultats[0].score}/{resultats[0].total}
            </div>
          </div>
        </div>
      )}

      {/* Boutons principaux */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <button
          onClick={() => router.push('/eleve/cours')}
          style={{ ...actionCard, borderColor: '#3dffa0' }}
          onMouseOver={e => (e.currentTarget.style.background = 'rgba(61,255,160,.08)')}
          onMouseOut={e => (e.currentTarget.style.background = '#161920')}
        >
          <div style={{ fontSize: 32, marginBottom: 10 }}>📖</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Cours</div>
          <div style={{ fontSize: 12, color: '#6b7394' }}>Les 10 thèmes officiels à maîtriser</div>
        </button>
        <button
          onClick={() => router.push('/eleve/quiz?mode=training')}
          style={{ ...actionCard, borderColor: '#4f6ef7' }}
          onMouseOver={e => (e.currentTarget.style.background = 'rgba(79,110,247,.1)')}
          onMouseOut={e => (e.currentTarget.style.background = '#161920')}
        >
          <div style={{ fontSize: 32, marginBottom: 10 }}>📚</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Entraînement</div>
          <div style={{ fontSize: 12, color: '#6b7394' }}>Correction immédiate après chaque question</div>
        </button>
        <button
          onClick={() => router.push('/eleve/quiz?mode=exam')}
          style={{ ...actionCard, borderColor: '#e8ff47' }}
          onMouseOver={e => (e.currentTarget.style.background = 'rgba(232,255,71,.05)')}
          onMouseOut={e => (e.currentTarget.style.background = '#161920')}
        >
          <div style={{ fontSize: 32, marginBottom: 10 }}>🎯</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Examen blanc</div>
          <div style={{ fontSize: 12, color: '#6b7394' }}>40 questions • chronomètre 20s • résultat à la fin</div>
        </button>
      </div>

      {/* Par thème */}
      <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 24, marginBottom: 28 }}>
        <h2 style={{ fontSize: 16, marginBottom: 18 }}>📂 Réviser par thème</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => router.push(`/eleve/quiz?mode=training&theme_id=${t.id}`)}
              style={themePill}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#4f6ef7'; e.currentTarget.style.color = '#4f6ef7' }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#2a2f3d'; e.currentTarget.style.color = '#f0f2f8' }}
            >
              {t.nom}
            </button>
          ))}
        </div>
      </div>

      {/* Historique */}
      {resultats.length > 0 && (
        <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, marginBottom: 18 }}>📊 Historique récent</h2>
          {resultats.slice(0, 5).map(r => {
            const pct = Math.round(r.score / r.total * 100)
            return (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e2230' }}>
                <div>
                  <span style={{ fontSize: 12, background: '#0d0f14', borderRadius: 20, padding: '3px 10px', color: '#6b7394', marginRight: 10 }}>
                    {r.mode === 'examen' ? '🎯 Examen' : '📚 Entraînement'}
                  </span>
                  <span style={{ fontSize: 13, color: '#6b7394' }}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
                <div style={{ fontWeight: 700, color: pct >= 80 ? '#3dffa0' : pct >= 60 ? '#e8ff47' : '#ff4f4f' }}>
                  {r.score}/{r.total} — {pct}%
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Footer liens légaux */}
      <div style={{ textAlign: 'center', marginTop: 40, fontSize: 12, color: '#6b7394' }}>
        <a href="/mentions-legales" style={{ color: '#6b7394', textDecoration: 'none' }}>Mentions légales & Confidentialité</a>
      </div>
    </div>
  )
}

const btnSecStyle: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 8, padding: '10px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }
const statCard: React.CSSProperties = { background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 18 }
const statLabel: React.CSSProperties = { fontSize: 12, color: '#6b7394', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }
const statVal: React.CSSProperties = { fontSize: 30, fontWeight: 800 }
const actionCard: React.CSSProperties = { background: '#161920', border: '1.5px solid', borderRadius: 12, padding: 24, cursor: 'pointer', textAlign: 'left', color: '#f0f2f8', transition: 'background .2s' }
const themePill: React.CSSProperties = { background: 'transparent', border: '1px solid #2a2f3d', borderRadius: 99, padding: '8px 16px', color: '#f0f2f8', cursor: 'pointer', fontSize: 13, transition: 'all .15s' }
