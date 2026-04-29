'use client'
// app/admin/eleves/[id]/stats/page.tsx
import { useEffect, useState } from 'react'
import { useAuth, useApi } from '@/components/AuthContext'
import { useRouter, useParams } from 'next/navigation'

interface Resultat { id: number; mode: string; score: number; total: number; created_at: string }
interface Eleve { id: string; prenom: string; nom: string; email: string; actif: boolean }

export default function EleveStatsPage() {
  const { user } = useAuth()
  const api = useApi()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [eleve, setEleve] = useState<Eleve | null>(null)
  const [resultats, setResultats] = useState<Resultat[]>([])

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    if (user.role !== 'admin') { router.push('/eleve'); return }
    loadData()
  }, [user])

  const loadData = async () => {
    const [eRes, rRes] = await Promise.all([
      api(`/api/users/${id}`),
      api(`/api/admin/eleve-stats/${id}`),
    ])
    if (eRes.ok) setEleve(await eRes.json())
    if (rRes.ok) setResultats(await rRes.json())
  }

  if (!eleve) return <div style={{ padding: 40, color: '#6b7394', fontFamily: 'sans-serif' }}>Chargement...</div>

  const examens = resultats.filter(r => r.mode === 'examen')
  const entrainements = resultats.filter(r => r.mode === 'entrainement')
  const avgExamen = examens.length ? Math.round(examens.reduce((s, r) => s + (r.score / r.total * 100), 0) / examens.length) : null
  const pret = avgExamen !== null && avgExamen >= 80

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
        <h1 style={{ color: '#e8ff47', fontSize: 22 }}>📊 Stats — {eleve.prenom} {eleve.nom}</h1>
        <button onClick={() => router.push('/admin/eleves')} style={btnSecStyle}>← Retour</button>
      </div>

      {/* Verdict */}
      <div style={{ background: pret ? 'rgba(61,255,160,.1)' : 'rgba(255,79,79,.1)', border: `1px solid ${pret ? 'rgba(61,255,160,.3)' : 'rgba(255,79,79,.3)'}`, borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>{pret ? '✅' : '⚠️'}</div>
        <div style={{ fontWeight: 700, fontSize: 16, color: pret ? '#3dffa0' : '#ff4f4f' }}>
          {avgExamen === null ? 'Aucun examen blanc effectué' : pret ? `Prêt(e) pour l'examen ! (moy. ${avgExamen}%)` : `Pas encore prêt(e) (moy. ${avgExamen}%)`}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Examens blancs', value: examens.length, color: '#e8ff47' },
          { label: 'Entraînements', value: entrainements.length, color: '#4f6ef7' },
          { label: 'Moy. examens', value: avgExamen !== null ? `${avgExamen}%` : '-', color: pret ? '#3dffa0' : '#ff4f4f' },
          { label: 'Total séries', value: resultats.length, color: '#f0f2f8' },
        ].map(s => (
          <div key={s.label} style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, color: '#6b7394', marginBottom: 6, textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Historique */}
      <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #2a2f3d', fontSize: 14, fontWeight: 600 }}>Historique des séries</div>
        {resultats.length === 0 && <div style={{ padding: 32, textAlign: 'center', color: '#6b7394' }}>Aucune série effectuée</div>}
        {resultats.map(r => {
          const pct = Math.round(r.score / r.total * 100)
          return (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #1e2230', fontSize: 14 }}>
              <div>
                <span style={{ background: '#0d0f14', borderRadius: 20, padding: '2px 10px', fontSize: 11, color: '#6b7394', marginRight: 10 }}>
                  {r.mode === 'examen' ? '🎯 Examen' : '📚 Entraînement'}
                </span>
                <span style={{ color: '#6b7394', fontSize: 12 }}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              <span style={{ fontWeight: 700, color: pct >= 80 ? '#3dffa0' : pct >= 60 ? '#e8ff47' : '#ff4f4f' }}>
                {r.score}/{r.total} — {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const btnSecStyle: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 8, padding: '9px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }
