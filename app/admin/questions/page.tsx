'use client'
// app/admin/questions/page.tsx — avec upload image + vidéo
import { useEffect, useRef, useState } from 'react'
import { useAuth, useApi } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

interface Theme { id: number; nom: string }
interface Reponse { texte: string; est_correcte: boolean }
interface Question {
  id: number
  texte: string
  image_url: string | null
  video_url: string | null
  explication: string
  themes: Theme
  reponses: (Reponse & { ordre: number })[]
}

const emptyForm = {
  texte: '', theme_id: '', image_url: '', video_url: '', explication: '',
  reponses: [
    { texte: '', est_correcte: true },
    { texte: '', est_correcte: false },
    { texte: '', est_correcte: false },
    { texte: '', est_correcte: false },
  ]
}

export default function AdminQuestionsPage() {
  const { user, token } = useAuth()
  const api = useApi()
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [questions, setQuestions] = useState<Question[]>([])
  const [themes, setThemes] = useState<Theme[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    if (user.role !== 'admin') { router.push('/eleve'); return }
    loadData()
  }, [user])

  const loadData = async () => {
    const [qRes, tRes] = await Promise.all([api('/api/questions'), api('/api/themes')])
    if (qRes.ok) setQuestions(await qRes.json())
    if (tRes.ok) setThemes(await tRes.json())
  }

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    })
    const data = await res.json()
    if (res.ok) {
      setForm(f => ({ ...f, image_url: data.url }))
      setMsg('✅ Image uploadée !')
    } else {
      setMsg('❌ Erreur upload : ' + data.error)
    }
    setUploading(false)
  }

  const handleReponseChange = (i: number, field: 'texte' | 'est_correcte', value: any) => {
    const updated = form.reponses.map((r, idx) => {
      if (field === 'est_correcte') return { ...r, est_correcte: idx === i }
      if (idx === i) return { ...r, texte: value }
      return r
    })
    setForm({ ...form, reponses: updated })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    const body = {
      texte: form.texte,
      theme_id: parseInt(form.theme_id),
      image_url: form.image_url || null,
      video_url: form.video_url || null,
      explication: form.explication,
      reponses: form.reponses,
    }
    const res = editId
      ? await api(`/api/questions/${editId}`, { method: 'PUT', body: JSON.stringify(body) })
      : await api('/api/questions', { method: 'POST', body: JSON.stringify(body) })
    const data = await res.json()
    if (res.ok) {
      setMsg(editId ? '✅ Question modifiée !' : '✅ Question ajoutée !')
      setForm(emptyForm); setEditId(null); setShowForm(false); loadData()
    } else {
      setMsg('❌ ' + data.error)
    }
    setLoading(false)
  }

  const startEdit = (q: Question) => {
    setForm({
      texte: q.texte, theme_id: String(q.themes?.id || ''),
      image_url: q.image_url || '', video_url: q.video_url || '',
      explication: q.explication,
      reponses: q.reponses.sort((a, b) => a.ordre - b.ordre).map(r => ({ texte: r.texte, est_correcte: r.est_correcte })),
    })
    setEditId(q.id); setShowForm(true); window.scrollTo(0, 0)
  }

  const deleteQuestion = async (id: number) => {
    if (!confirm('Supprimer cette question ?')) return
    await api(`/api/questions/${id}`, { method: 'DELETE' })
    loadData()
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ color: '#e8ff47', fontSize: 24 }}>📝 Gestion des questions</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => router.push('/admin')} style={btnSecStyle}>← Dashboard</button>
          <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm) }} style={btnPrimStyle}>
            {showForm ? '✕ Fermer' : '+ Nouvelle question'}
          </button>
        </div>
      </div>

      {msg && <div style={{ background: '#1e2230', border: '1px solid #2a2f3d', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14 }}>{msg}</div>}

      {showForm && (
        <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ marginBottom: 20, fontSize: 18 }}>{editId ? '✏️ Modifier' : '➕ Nouvelle question'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelSt}>Thème *</label>
                <select value={form.theme_id} onChange={e => setForm({ ...form, theme_id: e.target.value })} required style={inputSt}>
                  <option value="">-- Choisir --</option>
                  {themes.map(t => <option key={t.id} value={t.id}>{t.nom}</option>)}
                </select>
              </div>
              <div>
                <label style={labelSt}>URL Vidéo (optionnel)</label>
                <input type="text" value={form.video_url} onChange={e => setForm({ ...form, video_url: e.target.value })} style={inputSt} placeholder="https://... (.mp4)" />
              </div>
            </div>

            <label style={labelSt}>Texte de la question *</label>
            <textarea value={form.texte} onChange={e => setForm({ ...form, texte: e.target.value })} required style={{ ...inputSt, minHeight: 80 }} />

            {/* Upload image */}
            <label style={labelSt}>Image</label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
              <input type="text" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} style={{ ...inputSt, marginBottom: 0, flex: 1 }} placeholder="URL ou uploadez un fichier →" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} style={{ ...btnSecStyle, whiteSpace: 'nowrap' }}>
                {uploading ? 'Upload...' : '📎 Uploader'}
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
            </div>
            {form.image_url && <img src={form.image_url} alt="preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />}

            <label style={labelSt}>Réponses — cochez la bonne réponse</label>
            {form.reponses.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <input type="radio" name="bonne" checked={r.est_correcte} onChange={() => handleReponseChange(i, 'est_correcte', true)} style={{ accentColor: '#3dffa0', width: 18, height: 18, cursor: 'pointer', flexShrink: 0 }} />
                <span style={{ color: '#6b7394', fontWeight: 700, width: 20 }}>{String.fromCharCode(65 + i)}</span>
                <input type="text" value={r.texte} onChange={e => handleReponseChange(i, 'texte', e.target.value)} required style={{ ...inputSt, marginBottom: 0, flex: 1 }} placeholder={`Réponse ${String.fromCharCode(65 + i)}...`} />
              </div>
            ))}

            <label style={{ ...labelSt, marginTop: 14 }}>Explication *</label>
            <textarea value={form.explication} onChange={e => setForm({ ...form, explication: e.target.value })} required style={{ ...inputSt, minHeight: 70 }} placeholder="Pourquoi cette réponse est correcte..." />

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" disabled={loading} style={btnPrimStyle}>
                {loading ? 'Enregistrement...' : editId ? 'Modifier →' : 'Ajouter →'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} style={btnSecStyle}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #2a2f3d', color: '#6b7394', fontSize: 13 }}>
          {questions.length} question(s)
        </div>
        {questions.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#6b7394' }}>Aucune question. Commencez par en ajouter une !</div>}
        {questions.map(q => (
          <div key={q.id} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #1e2230', gap: 14 }}>
            <span style={{ background: '#0d0f14', borderRadius: 20, padding: '3px 10px', fontSize: 11, color: '#6b7394', whiteSpace: 'nowrap' }}>{q.themes?.nom}</span>
            <span style={{ flex: 1, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.texte}</span>
            {q.image_url && <span style={{ fontSize: 12, color: '#4f6ef7' }}>🖼</span>}
            {q.video_url && <span style={{ fontSize: 12, color: '#3dffa0' }}>🎬</span>}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => startEdit(q)} style={btnSmSec}>✏️</button>
              <button onClick={() => deleteQuestion(q.id)} style={btnSmDanger}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const labelSt: React.CSSProperties = { display: 'block', fontSize: 12, color: '#6b7394', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }
const inputSt: React.CSSProperties = { width: '100%', background: '#0d0f14', border: '1px solid #2a2f3d', borderRadius: 8, color: '#f0f2f8', padding: '10px 14px', fontSize: 14, marginBottom: 16, outline: 'none', boxSizing: 'border-box', fontFamily: 'sans-serif' }
const btnPrimStyle: React.CSSProperties = { background: '#e8ff47', color: '#0d0f14', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }
const btnSecStyle: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 8, padding: '10px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }
const btnSmSec: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 6, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }
const btnSmDanger: React.CSSProperties = { background: 'rgba(255,79,79,.15)', color: '#ff4f4f', border: '1px solid rgba(255,79,79,.3)', borderRadius: 6, padding: '6px 10px', fontSize: 12, cursor: 'pointer' }
