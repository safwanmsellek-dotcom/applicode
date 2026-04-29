'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'
import { SchemaChancesSurvie, SchemaDistancesPietonsCyclistes } from '../schemas'

export default function PietonsPage() {
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
          <div style={badge}>Fiche 17</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>La Route + Les Autres Usagers</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Les piétons</h1>
      </div>

      <SectionBlock>
        <p style={text}>Les piétons sont <strong style={{ color: '#e8ff47' }}>très vulnérables</strong>, imprevisibles et pas toujours attentifs. En 2019, 483 piétons sont décédés sur les routes françaises.</p>
      </SectionBlock>

      <SectionTitle>Chances de survie selon la vitesse</SectionTitle>

      <SectionBlock>
        <p style={text}>La vitesse de collision a un impact dramatique sur les chances de survie d'un piéton :</p>

        <SchemaChancesSurvie />

        <TableBlock color="#e84855" rows={[
          ['Vitesse de collision', 'Chances de survie'],
          ['30 km/h', '90%'],
          ['50 km/h', '20%'],
          ['70 km/h', '0,5%'],
        ]} />

        <Warning text="Une différence de vitesse supérieure à 40 km/h entre 2 usagers est souvent mortelle !" />
      </SectionBlock>

      <SectionTitle>Priorité des piétons</SectionTitle>

      <SectionBlock>
        <p style={text}>Les piétons ont la priorité quand ils sont <strong style={{ color: '#f0f2f8' }}>engagés ou ont l'intention de traverser</strong>, que ce soit SUR ou EN DEHORS des passages piétons. Ne klaxonnez jamais pour les presser à traverser plus vite.</p>

        <Warning text="SANCTION : Non-respect de la priorité aux piétons = 135 euros et -6 points sur le permis." />
      </SectionBlock>

      <SectionTitle>Distances latérales de sécurité</SectionTitle>

      <SectionBlock>
        <p style={text}>Lors du dépassement d'un piéton, respectez les distances minimales suivantes :</p>

        <SchemaDistancesPietonsCyclistes />

        <div style={keyPointsBox}>
          <div style={keyPoint}>🏙️ <strong>1 mètre en ville</strong></div>
          <div style={keyPoint}>🛣️ <strong>1,50 mètre hors agglomération</strong></div>
        </div>

        <Tip text="Hors agglomération sans trottoir, les piétons doivent marcher à gauche (face aux véhicules) pour mieux voir arriver les voitures." />
      </SectionBlock>

      <SectionTitle>Catégories de piétons à surveiller</SectionTitle>

      <SectionBlock>
        <SubTitle>Les enfants</SubTitle>
        <p style={text}>• <strong style={{ color: '#f0f2f8' }}>Petite taille</strong> : difficiles à voir derrière les véhicules stationnés<br/>
        • <strong style={{ color: '#f0f2f8' }}>Inconscients du danger</strong> : peuvent traverser à tout moment<br/>
        • <strong style={{ color: '#f0f2f8' }}>Champ visuel réduit</strong> : 70 degrés (vs 180 pour un adulte)<br/>
        • Les enfants de moins de 8 ans ont le droit de circuler à vélo sur le trottoir</p>

        <Tip text="À l'examen : Panneau triangulaire « enfants » = ralentir obligatoirement. Rouler à la vitesse maximale autorisée sans ralentir constitue une infraction." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Les adolescents</SubTitle>
        <p style={text}>En groupe, ils chahutent, se bousculent, peuvent courir pour attraper un bus. Ralentissez toujours à proximité des groupes d'adolescents.</p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Les personnes âgées</SubTitle>
        <p style={text}>• Entendent et voient moins bien<br/>
        • Se déplacent plus lentement<br/>
        • Constituent la <strong style={{ color: '#e8ff47' }}>majorité des piétons tués en agglomération</strong> (plus de 65 ans)<br/>
        • Agrandissez systématiquement vos distances de sécurité</p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Les personnes handicapées</SubTitle>
        <p style={text}>Les chaises roulantes non motorisées sont considérées comme des <strong style={{ color: '#f0f2f8' }}>piétons</strong>. Elles peuvent circuler aussi bien sur les trottoirs que sur les chaussées. Facilitez toujours leur passage.</p>
      </SectionBlock>

      <SectionTitle>Points clés à retenir</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✓ 90% de survie à 30 km/h, 0,5% à 70 km/h</div>
          <div style={keyPoint}>✓ Piétons prioritaires SUR et HORS passages piétons</div>
          <div style={keyPoint}>✓ Non-respect = 135€ et -6 points</div>
          <div style={keyPoint}>✓ Distance : 1m en ville / 1,50m hors agglo</div>
          <div style={keyPoint}>✓ Enfants : champ visuel réduit à 70°</div>
          <div style={keyPoint}>✓ Personnes âgées = majorité des victimes en ville</div>
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
