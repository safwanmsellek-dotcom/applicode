'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'
import { SchemaDistancesPietonsCyclistes } from '../schemas'

export default function CyclistesPage() {
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
          <div style={badge}>Fiche 18</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>La Route + Les Autres Usagers</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Les cyclistes</h1>
      </div>

      <SectionBlock>
        <p style={text}>Les cyclistes sont des usagers <strong style={{ color: '#e8ff47' }}>particulièrement vulnérables</strong> :</p>
        
        <div style={keyPointsBox}>
          <div style={keyPoint}>🚴 Circulent sur la chaussée, sans protection</div>
          <div style={keyPoint}>⚠️ Instables et font des écarts de trajectoire</div>
          <div style={keyPoint}>🤫 Silencieux, se faufilent entre les voies</div>
        </div>
      </SectionBlock>

      <SectionTitle>Comportement à adopter</SectionTitle>

      <SectionBlock>
        <SubTitle>Usage du klaxon</SubTitle>
        <p style={text}>• <strong style={{ color: '#e84855' }}>Interdit en agglomération</strong> sauf danger immédiat<br/>
        • Possible hors agglomération, notamment en montagne</p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Priorité aux cyclistes</SubTitle>
        <p style={text}>• <strong style={{ color: '#e8ff47' }}>Cédez-leur la priorité</strong> quand ils signalent un changement de direction avec le bras<br/>
        • Contrôlez vos rétroviseurs aux arrêts et départs, <strong style={{ color: '#f0f2f8' }}>surtout aux feux</strong></p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Distances de sécurité au dépassement</SubTitle>
        <p style={text}>Doublez les distances de sécurité habituelles lors du dépassement d'un cycliste :</p>

        <SchemaDistancesPietonsCyclistes />

        <div style={keyPointsBox}>
          <div style={keyPoint}>🏙️ <strong>1 mètre en ville</strong></div>
          <div style={keyPoint}>🛣️ <strong>1,50 mètre hors agglomération</strong></div>
          <div style={{ fontSize: 12, color: '#6b7394', marginTop: 8 }}>Prenez le plus de marge possible</div>
        </div>

        <Tip text="Depuis 2015, vous POUVEZ chevaucher une ligne blanche continue pour dépasser un cycliste en toute sécurité." />
      </SectionBlock>

      <SectionTitle>Bandes et pistes cyclables</SectionTitle>

      <SectionBlock>
        <p style={text}>La circulation, l'arrêt et le stationnement sont <strong style={{ color: '#e84855' }}>strictement interdits</strong> sur les bandes cyclables.</p>

        <Warning text="SANCTION : Circuler, s'arrêter ou stationner sur une bande cyclable est passible d'une amende." />

        <Tip text="À l'examen : Dans certaines villes, un panonceau sous les feux tricolores autorise les cyclistes à passer au rouge. Vous devez leur céder le passage." />
      </SectionBlock>

      <SectionTitle>Points clés à retenir</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✓ Klaxon interdit en ville (sauf danger)</div>
          <div style={keyPoint}>✓ Priorité si le cycliste tend le bras</div>
          <div style={keyPoint}>✓ Contrôlez rétros aux arrêts/départs et feux</div>
          <div style={keyPoint}>✓ Distance : 1m en ville / 1,50m hors agglo</div>
          <div style={keyPoint}>✓ Vous pouvez chevaucher une ligne blanche pour dépasser</div>
          <div style={keyPoint}>✓ INTERDIT : circuler/arrêter/stationner sur bande cyclable</div>
          <div style={keyPoint}>✓ Panonceau sous feu : cycliste peut passer au rouge</div>
        </div>
      </SectionBlock>
    </div>
  )
}

const SectionBlock = ({ children }: { children: React.ReactNode }) => (
  <div style={{ marginBottom: 28 }}>{children}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16, color: '#e8ff47' }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#f0f2f8' }}>{children}</h3>
)

const Tip = ({ text }: { text: string }) => (
  <div style={{ background: '#1a3a1a', border: '1px solid #2d5a2d', borderRadius: 10, padding: '14px 16px', marginTop: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    <div style={{ fontSize: 18, flexShrink: 0 }}>💡</div>
    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#b8e6b8' }}>{text}</p>
  </div>
)

const Warning = ({ text }: { text: string }) => (
  <div style={{ background: '#3a1a1a', border: '1px solid #5a2d2d', borderRadius: 10, padding: '14px 16px', marginTop: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    <div style={{ fontSize: 18, flexShrink: 0 }}>⚠️</div>
    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#e6b8b8' }}>{text}</p>
  </div>
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
  background: '#e84855',
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

const keyPointsBox = {
  background: '#161920',
  border: '1px solid #2a2f3d',
  borderRadius: 12,
  padding: 20,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12
}

const keyPoint = {
  fontSize: 14,
  color: '#b8e6b8',
  lineHeight: 1.6
}
