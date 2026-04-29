'use client'
// app/admin/eleves/page.tsx — responsive cards on mobile
import { useEffect, useState } from 'react'
import { useAuth, useApi } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

interface Eleve {
  id: string
  email: string
  prenom: string
  nom: string
  actif: boolean
  numero_dossier: string | null
  created_at: string
}

export default function AdminElevesPage() {
  const { user } = useAuth()
  const api = useApi()
  const router = useRouter()

  const [eleves, setEleves] = useState<Eleve[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', password: '', numero_dossier: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    if (user.role !== 'admin') { router.push('/eleve'); return }
    loadEleves()
  }, [user])

  const loadEleves = async () => {
    const res = await api('/api/users')
    if (res.ok) setEleves(await res.json())
  }

  const toggleActif = async (eleve: Eleve) => {
    const res = await api(`/api/users/${eleve.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ actif: !eleve.actif }),
    })
    if (res.ok) { setMsg(eleve.actif ? '⚠️ Élève suspendu' : '✅ Élève réactivé'); loadEleves() }
  }

  const deleteEleve = async (id: string) => {
    if (!confirm('Supprimer définitivement cet élève ?')) return
    const res = await api(`/api/users/${id}`, { method: 'DELETE' })
    if (res.ok) { setMsg('🗑️ Élève supprimé'); loadEleves() }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    if (form.numero_dossier && !/^\d{12}$/.test(form.numero_dossier)) {
      setMsg('❌ Le n° NEPH doit contenir exactement 12 chiffres')
      setLoading(false)
      return
    }
    const res = await api('/api/users', { method: 'POST', body: JSON.stringify(form) })
    const data = await res.json()
    if (res.ok) {
      setMsg('✅ Élève créé avec succès')
      setForm({ prenom: '', nom: '', email: '', password: '', numero_dossier: '' })
      setShowForm(false)
      loadEleves()
    } else {
      setMsg('❌ ' + data.error)
    }
    setLoading(false)
  }

  const filtered = eleves.filter(e => {
    const q = search.toLowerCase()
    return !q || e.prenom.toLowerCase().includes(q) || e.nom.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || (e.numero_dossier || '').toLowerCase().includes(q)
  })

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 10 }}>
        <h1 style={{ color: '#e8ff47', fontSize: 24 }}>👥 Gestion des élèves</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => router.push('/admin')} style={btnSecStyle}>← Dashboard</button>
          <button onClick={() => setShowForm(!showForm)} style={btnPrimStyle}>
            {showForm ? '✕ Fermer' : '+ Ajouter un élève'}
          </button>
        </div>
      </div>

      {msg && <div style={{ background: '#1e2230', border: '1px solid #2a2f3d', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14 }}>{msg}</div>}

      {showForm && (
        <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, marginBottom: 20 }}>Créer un compte élève</h2>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              <div>
                <label style={labelSt}>Prénom *</label>
                <input value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} required style={inputSt} />
              </div>
              <div>
                <label style={labelSt}>Nom *</label>
                <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required style={inputSt} />
              </div>
            </div>
            <label style={labelSt}>Email *</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={inputSt} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              <div>
                <label style={labelSt}>Mot de passe *</label>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={inputSt} placeholder="6 caractères minimum" />
              </div>
              <div>
                <label style={labelSt}>N° NEPH</label>
                <input
                  value={form.numero_dossier}
                  onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 12); setForm({ ...form, numero_dossier: v }) }}
                  style={inputSt}
                  placeholder="12 chiffres"
                  inputMode="numeric"
                  maxLength={12}
                />
                {form.numero_dossier && form.numero_dossier.length !== 12 && (
                  <p style={{ color: '#ff9f4f', fontSize: 11, marginTop: -12, marginBottom: 8 }}>{form.numero_dossier.length}/12 chiffres</p>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" disabled={loading} style={btnPrimStyle}>{loading ? 'Création...' : 'Créer le compte →'}</button>
              <button type="button" onClick={() => setShowForm(false)} style={btnSecStyle}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      {/* Barre de recherche */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="🔍 Rechercher un élève (nom, email, n° dossier)..."
        style={{ ...inputSt, marginBottom: 20 }}
      />

      {/* Liste responsive — cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 && (
          <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 40, textAlign: 'center', color: '#6b7394' }}>
            {search ? 'Aucun résultat' : 'Aucun élève inscrit'}
          </div>
        )}
        {filtered.map(e => (
          <div key={e.id} style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{e.prenom} {e.nom}</div>
                <div style={{ color: '#6b7394', fontSize: 13 }}>{e.email}</div>
                {e.numero_dossier && (
                  <div style={{ color: '#4f6ef7', fontSize: 12, marginTop: 2 }}>Dossier : {e.numero_dossier}</div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: e.actif ? '#3dffa0' : '#ff4f4f', fontSize: 12, fontWeight: 700 }}>
                  {e.actif ? '● Actif' : '● Suspendu'}
                </span>
                <span style={{ color: '#6b7394', fontSize: 11 }}>
                  {new Date(e.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => router.push(`/admin/eleves/${e.id}/stats`)} style={btnSmBlue}>📊 Stats</button>
              <button onClick={() => toggleActif(e)} style={btnSmSec}>
                {e.actif ? 'Suspendre' : 'Réactiver'}
              </button>
              <button onClick={() => deleteEleve(e.id)} style={btnSmDanger}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const labelSt: React.CSSProperties = { display: 'block', fontSize: 12, color: '#6b7394', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }
const inputSt: React.CSSProperties = { width: '100%', background: '#0d0f14', border: '1px solid #2a2f3d', borderRadius: 8, color: '#f0f2f8', padding: '10px 14px', fontSize: 14, marginBottom: 16, outline: 'none', boxSizing: 'border-box' }
const btnPrimStyle: React.CSSProperties = { background: '#e8ff47', color: '#0d0f14', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }
const btnSecStyle: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 8, padding: '10px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }
const btnSmSec: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 6, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }
const btnSmBlue: React.CSSProperties = { background: 'rgba(79,110,247,.15)', color: '#4f6ef7', border: '1px solid rgba(79,110,247,.3)', borderRadius: 6, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }
const btnSmDanger: React.CSSProperties = { background: 'rgba(255,79,79,.15)', color: '#ff4f4f', border: '1px solid rgba(255,79,79,.3)', borderRadius: 6, padding: '6px 10px', fontSize: 12, cursor: 'pointer' }
