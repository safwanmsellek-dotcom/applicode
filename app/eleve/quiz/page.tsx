'use client'
import { useEffect, useRef, useState, Suspense } from 'react'
import { useAuth, useApi } from '@/components/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'

interface Reponse { id: number; texte: string; est_correcte: boolean; ordre: number }
interface Question {
  id: number
  texte: string
  image_url: string | null
  video_url: string | null
  explication: string
  themes: { id: number; nom: string }
  reponses: Reponse[]
}

const TIMER_DURATION = 30

function QuizContent() {
  const { user } = useAuth()
  const api = useApi()
  const router = useRouter()
  const params = useSearchParams()
  const mode = params.get('mode') || 'training'
  const themeId = params.get('theme_id')

  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [speakingType, setSpeakingType] = useState<'question' | 'explication' | null>(null)

  const scoreRef = useRef(0)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  // Timer state
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION)
  const [timerRunning, setTimerRunning] = useState(false)
  const [waitingForVoice, setWaitingForVoice] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    loadQuestions()
  }, [user])

  const loadQuestions = async () => {
    scoreRef.current = 0
    setScoreDisplay(0)
    const url = mode === 'exam'
      ? '/api/questions?mode=exam'
      : themeId
        ? `/api/questions?theme_id=${themeId}`
        : '/api/questions'
    const res = await api(url)
    if (res.ok) setQuestions(await res.json())
    setLoading(false)
  }

  // --- Démarrer le compte à rebours ---
  const startTimer = () => {
    if (mode !== 'exam') return
    clearInterval(timerRef.current!)
    setTimeLeft(TIMER_DURATION)
    setTimerRunning(true)
    setWaitingForVoice(false)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          setTimerRunning(false)
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // --- Lecture vocale de la question ---
  useEffect(() => {
    if (loading || done || questions.length === 0) return
    if (answered) return

    // Reset timer display
    clearInterval(timerRef.current!)
    setTimerRunning(false)
    setTimeLeft(TIMER_DURATION)

    const q = questions[index]
    if (!q) return

    if (voiceEnabled && 'speechSynthesis' in window) {
      // Lire la question, le timer démarrera quand la voix aura fini
      setWaitingForVoice(true)
      const reponsesTexte = q.reponses
        .map((r, i) => `Réponse ${String.fromCharCode(65 + i)}: ${r.texte}`)
        .join('. ')
      const fullText = `Question ${index + 1}. ${q.texte}. ${reponsesTexte}`

      const timer = setTimeout(() => {
        speakQuestion(fullText)
      }, 400)

      return () => { clearTimeout(timer); stopSpeech() }
    } else {
      // Pas de voix → démarrer le timer immédiatement
      setWaitingForVoice(false)
      const timer = setTimeout(() => startTimer(), 300)
      return () => clearTimeout(timer)
    }
  }, [index, loading, done, voiceEnabled, questions.length])

  // Lecture vocale spéciale pour la question — lance le timer à la fin
  const speakQuestion = (text: string) => {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'fr-FR'
    utter.rate = 0.9
    utter.onstart = () => { setSpeaking(true); setSpeakingType('question') }
    utter.onend = () => {
      setSpeaking(false)
      setSpeakingType(null)
      // La voix a fini → on lance le timer
      startTimer()
    }
    utter.onerror = () => {
      setSpeaking(false)
      setSpeakingType(null)
      startTimer()
    }
    window.speechSynthesis.speak(utter)
  }

  // Lecture vocale générique (pour explication ou réécoute manuelle)
  const speakText = (text: string, type: 'question' | 'explication' = 'question') => {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'fr-FR'
    utter.rate = type === 'question' ? 0.9 : 0.95
    utter.onstart = () => { setSpeaking(true); setSpeakingType(type) }
    utter.onend = () => { setSpeaking(false); setSpeakingType(null) }
    utter.onerror = () => { setSpeaking(false); setSpeakingType(null) }
    window.speechSynthesis.speak(utter)
  }

  const stopSpeech = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
    setSpeakingType(null)
  }

  const handleTimeout = () => {
    if (answered) return
    setAnswered(true)
    setSelected(null)
  }

  const selectAnswer = (reponseIdx: number) => {
    if (answered) return
    clearInterval(timerRef.current!)
    setTimerRunning(false)
    setAnswered(true)
    setSelected(reponseIdx)
    const q = questions[index]
    if (q.reponses[reponseIdx].est_correcte) {
      scoreRef.current += 1
      setScoreDisplay(scoreRef.current)
    }
    if (mode === 'training' && 'speechSynthesis' in window) {
      speakText(q.explication, 'explication')
    }
  }

  const next = () => {
    stopSpeech()
    clearInterval(timerRef.current!)
    setTimerRunning(false)
    if (index + 1 >= questions.length) {
      saveResultat(scoreRef.current)
      setDone(true)
    } else {
      setIndex(i => i + 1)
      setAnswered(false)
      setSelected(null)
    }
  }

  const saveResultat = async (finalScore: number) => {
    await api('/api/resultats', {
      method: 'POST',
      body: JSON.stringify({ mode, score: finalScore, total: questions.length }),
    })
  }

  const restart = () => {
    setIndex(0)
    scoreRef.current = 0
    setScoreDisplay(0)
    setAnswered(false)
    setSelected(null)
    setDone(false)
    setTimerRunning(false)
    setWaitingForVoice(false)
    clearInterval(timerRef.current!)
    setLoading(true)
    loadQuestions()
  }

  if (loading) return <div style={{ color: '#6b7394', padding: 40, textAlign: 'center', fontFamily: 'sans-serif' }}>Chargement...</div>

  if (questions.length === 0) return (
    <div style={{ padding: 40, textAlign: 'center', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      <p style={{ color: '#6b7394', marginBottom: 20 }}>Aucune question disponible.</p>
      <button onClick={() => router.push('/eleve')} style={btnPrimStyle}>← Retour</button>
    </div>
  )

  // RÉSULTATS
  if (done) {
    const finalScore = scoreRef.current
    const total = questions.length
    const pct = Math.round(finalScore / total * 100)
    const pass = pct >= 80
    return (
      <div style={{ maxWidth: 540, margin: '60px auto', padding: '0 20px', fontFamily: 'sans-serif', color: '#f0f2f8', textAlign: 'center' }}>
        <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 16, padding: 40 }}>
          <div style={{ width: 110, height: 110, borderRadius: '50%', border: `4px solid ${pass ? '#3dffa0' : '#ff4f4f'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: pass ? '#3dffa0' : '#ff4f4f', lineHeight: 1 }}>{finalScore}</div>
            <div style={{ fontSize: 13, color: '#6b7394' }}>/ {total}</div>
          </div>
          <h2 style={{ fontSize: 24, marginBottom: 8 }}>{pass ? '🎉 Bravo !' : '😔 À retravailler'}</h2>
          <p style={{ color: '#6b7394', marginBottom: 6 }}>
            {pass ? "Excellent ! Vous êtes prêt(e) pour l'examen." : "Continuez à vous entraîner !"}
          </p>
          <div style={{ fontSize: 44, fontWeight: 800, color: pass ? '#3dffa0' : '#ff4f4f', margin: '16px 0' }}>{pct}%</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={restart} style={btnPrimStyle}>🔄 Recommencer</button>
            <button onClick={() => router.push('/eleve')} style={btnSecStyle}>🏠 Accueil</button>
          </div>
        </div>
      </div>
    )
  }

  // QUESTION
  const q = questions[index]
  const total = questions.length
  const pct = (index / total) * 100

  // Couleur du timer
  const timerColor = !timerRunning ? '#6b7394'
    : timeLeft <= 5 ? '#ff4f4f'
    : timeLeft <= 10 ? '#ff9f4f'
    : '#f0f2f8'

  const timerBorderColor = !timerRunning ? '#2a2f3d'
    : timeLeft <= 5 ? '#ff4f4f'
    : timeLeft <= 10 ? '#ff9f4f'
    : '#e8ff47'

  return (
    <div style={{ maxWidth: 660, margin: '0 auto', padding: '24px 20px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Question {index + 1} / {total}</div>
          <div style={{ fontSize: 12, color: '#6b7394' }}>{q.themes?.nom}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Réécouter */}
          <button
            onClick={() => {
              const qq = questions[index]
              const reponsesTexte = qq.reponses.map((r, i) => `Réponse ${String.fromCharCode(65 + i)}: ${r.texte}`).join('. ')
              speakText(`${qq.texte}. ${reponsesTexte}`, 'question')
            }}
            style={{
              background: speakingType === 'question' ? 'rgba(232,255,71,.15)' : 'transparent',
              border: `1px solid ${speakingType === 'question' ? 'rgba(232,255,71,.4)' : '#2a2f3d'}`,
              borderRadius: 8, color: speakingType === 'question' ? '#e8ff47' : '#6b7394',
              padding: '6px 10px', cursor: 'pointer', fontSize: 13,
              animation: speakingType === 'question' ? 'pulse 1.5s infinite' : 'none'
            }}
            title="Réécouter la question"
          >
            {speakingType === 'question' ? '🔊' : '🔈'}
          </button>
          {/* Voix ON/OFF */}
          <button
            onClick={() => { setVoiceEnabled(v => !v); if (speaking) stopSpeech() }}
            style={{
              background: voiceEnabled ? 'rgba(61,255,160,.1)' : 'rgba(255,79,79,.1)',
              border: `1px solid ${voiceEnabled ? 'rgba(61,255,160,.3)' : 'rgba(255,79,79,.3)'}`,
              borderRadius: 8, color: voiceEnabled ? '#3dffa0' : '#ff4f4f',
              padding: '6px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap'
            }}
            title={voiceEnabled ? 'Désactiver la voix' : 'Activer la voix'}
          >
            {voiceEnabled ? '🔊 ON' : '🔇 OFF'}
          </button>
          {/* Timer — visible en mode examen */}
          {mode === 'exam' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{
                width: 50, height: 50, borderRadius: '50%',
                border: `3px solid ${timerBorderColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 18, color: timerColor,
                transition: 'all .3s',
                animation: timerRunning && timeLeft <= 5 ? 'pulse 0.5s infinite' : 'none',
              }}>
                {waitingForVoice ? '🎙️' : timeLeft}
              </div>
              {waitingForVoice && (
                <span style={{ fontSize: 9, color: '#6b7394', whiteSpace: 'nowrap' }}>Écoute...</span>
              )}
            </div>
          )}
          <button onClick={() => { stopSpeech(); clearInterval(timerRef.current!); router.push('/eleve') }} style={{ background: 'transparent', border: '1px solid #2a2f3d', borderRadius: 8, color: '#6b7394', padding: '6px 12px', cursor: 'pointer', fontSize: 13 }}>✕ Quitter</button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ background: '#1e2230', borderRadius: 99, height: 5, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: '#e8ff47', borderRadius: 99, transition: 'width .4s' }} />
      </div>

      {/* Info "en écoute" en mode exam */}
      {mode === 'exam' && waitingForVoice && !answered && (
        <div style={{ background: 'rgba(232,255,71,.08)', border: '1px solid rgba(232,255,71,.2)', borderRadius: 10, padding: '10px 16px', marginBottom: 14, fontSize: 13, color: '#e8ff47', textAlign: 'center', animation: 'pulse 2s infinite' }}>
          🎙️ Écoutez la question... Le compte à rebours de {TIMER_DURATION}s démarrera après la lecture.
        </div>
      )}

      {/* Carte question */}
      <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
        {/* Vidéo */}
        {q.video_url && (
          <video src={q.video_url} controls autoPlay muted style={{ width: '100%', borderRadius: 10, marginBottom: 18, maxHeight: 240 }} />
        )}
        {/* Image */}
        {!q.video_url && q.image_url && (
          <img src={q.image_url} alt="question" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 10, marginBottom: 18 }} />
        )}

        <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.55, marginBottom: 22 }}>{q.texte}</div>

        {/* Réponses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.reponses.map((r, i) => {
            let borderColor = '#2a2f3d'
            let bg = '#0d0f14'
            let color = '#f0f2f8'
            if (answered) {
              if (r.est_correcte) { borderColor = '#3dffa0'; bg = 'rgba(61,255,160,.1)'; color = '#3dffa0' }
              else if (i === selected && !r.est_correcte) { borderColor = '#ff4f4f'; bg = 'rgba(255,79,79,.1)'; color = '#ff4f4f' }
            }
            return (
              <button
                key={r.id}
                onClick={() => selectAnswer(i)}
                disabled={answered}
                style={{ width: '100%', textAlign: 'left', padding: '13px 16px', background: bg, border: `1.5px solid ${borderColor}`, borderRadius: 10, color, cursor: answered ? 'default' : 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 12, transition: 'all .15s' }}
              >
                <span style={{ width: 26, height: 26, borderRadius: 6, background: '#161920', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {r.texte}
              </button>
            )
          })}
        </div>

        {/* Explication (training) */}
        {answered && mode === 'training' && (
          <div style={{ marginTop: 16, background: 'rgba(79,110,247,.1)', border: '1px solid rgba(79,110,247,.3)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#a0b0ff', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
              <span>💡 {q.explication}</span>
              <button
                onClick={() => speaking && speakingType === 'explication' ? stopSpeech() : speakText(q.explication, 'explication')}
                style={{ background: speakingType === 'explication' ? 'rgba(232,255,71,.2)' : 'rgba(79,110,247,.2)', border: 'none', borderRadius: 6, padding: '4px 10px', color: speakingType === 'explication' ? '#e8ff47' : '#a0b0ff', cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                {speakingType === 'explication' ? '⏹ Stop' : '🔊 Écouter'}
              </button>
            </div>
          </div>
        )}
      </div>

      {answered && (
        <button onClick={next} style={{ ...btnPrimStyle, width: '100%', padding: 14, fontSize: 15 }}>
          {index + 1 < total ? 'Question suivante →' : 'Voir les résultats →'}
        </button>
      )}
    </div>
  )
}

const btnPrimStyle: React.CSSProperties = { background: '#e8ff47', color: '#0d0f14', border: 'none', borderRadius: 8, padding: '11px 22px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }
const btnSecStyle: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 8, padding: '11px 18px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }

export default function QuizPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#f0f2f8' }}>Chargement du quiz...</div>}>
      <QuizContent />
    </Suspense>
  )
}
