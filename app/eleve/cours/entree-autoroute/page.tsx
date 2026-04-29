'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'
import { SchemaVoieInsertion } from '../schemas'

export default function EntreeAutoroutePage() {
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
          <div style={badge}>Fiche 2</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>La Route + Les Autres Usagers</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Entrée sur l'autoroute</h1>
      </div>

      <SectionBlock>
        <p style={text}>Les autoroutes sont des <strong style={{ color: '#e8ff47' }}>routes à sens unique</strong> avec des terre-pleins centraux et sans intersections. Elles sont interdites aux piétons, cyclistes, cyclomoteurs, voiturettes et tracteurs.</p>
      </SectionBlock>

      <SectionTitle>La voie d'insertion</SectionTitle>

      <SectionBlock>
        <p style={text}>Pour entrer sur l'autoroute, vous empruntez d'abord une <strong style={{ color: '#f0f2f8' }}>bretelle</strong>, puis une <strong style={{ color: '#f0f2f8' }}>voie d'insertion</strong>. Sur cette voie, vous devez <strong style={{ color: '#e8ff47' }}>céder le passage</strong> aux véhicules déjà présents sur l'autoroute : vous n'êtes pas prioritaire.</p>

        <SchemaVoieInsertion />

        <Warning text="Il est strictement INTERDIT de s'arrêter sur la voie d'insertion !" />
      </SectionBlock>

      <SectionTitle>Procédure d'insertion en 3 phases</SectionTitle>

      <SectionBlock>
        <SubTitle>Phase 1 : Prendre de l'élan</SubTitle>
        <p style={text}>• Accélérez progressivement de 40 à 110 km/h<br/>
        • Maintenez une trajectoire centrée sur la voie d'insertion<br/>
        • Activez vos clignotants</p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Phase 2 : Observer</SubTitle>
        <p style={text}>• Vérifiez vos rétroviseurs<br/>
        • Contrôlez vos angles morts en tournant la tête<br/>
        • Évaluez la densité du trafic sur l'autoroute</p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Phase 3 : S'insérer</SubTitle>
        <p style={text}>Trois cas de figure possibles :</p>
        
        <TableBlock color="#e84855" rows={[
          ['Situation', 'Action à effectuer'],
          ['Cas 1 : Pas de véhicules', 'Accélérer et s\'insérer'],
          ['Cas 2 : Véhicules éloignés', 'Accélérer et s\'insérer'],
          ['Cas 3 : Véhicules proches', 'Ralentir et attendre un créneau'],
        ]} />

        <Tip text="À l'examen : L'insertion est possible dès que la ligne blanche devient discontinue (en pointillés)." />
      </SectionBlock>

      <SectionTitle>Les péages</SectionTitle>

      <SectionBlock>
        <p style={text}>Aux péages, respectez la signalisation lumineuse :</p>
        
        <div style={keyPointsBox}>
          <div style={keyPoint}>✗ <strong style={{ color: '#e84855' }}>Croix rouge</strong> = voie fermée</div>
          <div style={keyPoint}>✓ <strong style={{ color: '#2d5a2d' }}>Flèche verte</strong> = voie ouverte</div>
        </div>

        <Tip text="INFO : Le « T » du ticket normal permet l'arrêt complet, tandis que le « T orange » du télépéage permet de passer à 30 km/h maximum." />
      </SectionBlock>

      <SectionTitle>Points clés à retenir</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✓ Bretelle puis voie d'insertion : vous cédez le passage</div>
          <div style={keyPoint}>✓ INTERDIT de s'arrêter sur la voie d'insertion</div>
          <div style={keyPoint}>✓ Accélérer de 40 à 110 km/h + clignotants</div>
          <div style={keyPoint}>✓ Contrôler rétroviseurs ET angles morts</div>
          <div style={keyPoint}>✓ Insertion possible dès que la ligne est en pointillés</div>
          <div style={keyPoint}>✓ Télépéage : 30 km/h maximum</div>
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

interface TableBlockProps {
  color: string
  rows: string[][]
}

const TableBlock = ({ color, rows }: TableBlockProps) => (
  <div style={{ marginTop: 16, overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr>
          {rows[0].map((header, i) => (
            <th key={i} style={{ background: color + '22', color: color, padding: '12px 14px', textAlign: 'left', fontWeight: 600, borderBottom: `2px solid ${color}` }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.slice(1).map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid #2a2f3d' }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '12px 14px', color: '#d0d2e0' }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
