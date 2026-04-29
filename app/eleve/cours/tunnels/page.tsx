'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

export default function TypesRoutesPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user])

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px 80px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      {/* Header */}
      <button onClick={() => router.push('/eleve/cours')} style={backBtn}>← Retour aux fiches</button>

      <div style={{ marginTop: 20, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={badge}>Fiche 1</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>La Route + Les Autres Usagers</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Les différents types de routes</h1>
      </div>

      {/* Intro */}
      <SectionBlock>
        <p style={text}>Une route est une <strong style={{ color: '#e8ff47' }}>voie terrestre aménagée</strong> pour la circulation de véhicules à roues. Il existe différents types de routes avec des règles et des limitations de vitesse spécifiques.</p>
      </SectionBlock>

      {/* Voies à double sens */}
      <SectionTitle>Voies à double sens</SectionTitle>

      <SectionBlock>
        <p style={text}>Sur les routes à double sens, une <strong style={{ color: '#f0f2f8' }}>ligne discontinue</strong> au centre de la chaussée indique que le dépassement est autorisé. Vous pouvez franchir cette ligne pour doubler un véhicule, à condition de le faire en toute sécurité.</p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Les routes à trois voies</SubTitle>
        <p style={text}>Les routes à trois voies alternent le sens de circulation de la voie du milieu. Cette voie centrale est utilisée tantôt par les véhicules dans un sens, tantôt dans l'autre, selon la signalisation.</p>
        
        <Warning text="Rabattez-vous impérativement avant la 3ème flèche ! Ne restez jamais sur la voie centrale si elle n'est plus dans votre sens de circulation." />
      </SectionBlock>

      {/* Limitations de vitesse */}
      <SectionTitle>Limitations de vitesse selon le type de route</SectionTitle>

      <SectionBlock>
        <p style={text}>Les limitations de vitesse varient en fonction de la configuration de la route :</p>

        <TableBlock color="#e84855" rows={[
          ['Type de route', 'Vitesse maximale'],
          ['2 voies double sens', '80 km/h'],
          ['3-4 voies (2 dans le même sens)', '90 km/h'],
          ['Route avec terre-plein central', '110 km/h'],
          ['Route avec terre-plein + pluie ou permis probatoire', '100 km/h'],
        ]} />
      </SectionBlock>

      {/* Routes à accès réglementé */}
      <SectionTitle>Routes à accès réglementé</SectionTitle>

      <SectionBlock>
        <p style={text}>Certaines routes sont interdites à certains usagers : cyclistes, cyclomoteurs, piétons et tracteurs n'y sont pas autorisés. Ces routes sont signalées par un <strong style={{ color: '#e8ff47' }}>panneau spécifique</strong>.</p>

        <Warning text="ATTENTION : Une route avec terre-plein central n'est PAS forcément une route à accès réglementé. Seul le panneau de signalisation l'indique !" />
      </SectionBlock>

      {/* Périphériques */}
      <SectionTitle>Les périphériques</SectionTitle>

      <SectionBlock>
        <p style={text}>Le périphérique parisien a une limitation de vitesse de <strong style={{ color: '#f0f2f8' }}>50 km/h</strong>. C'est une spécificité importante à connaître.</p>

        <Tip text="À l'examen : À Paris, les véhicules entrant sur le périphérique sont prioritaires (priorité à droite)." />
      </SectionBlock>

      {/* Points clés */}
      <SectionTitle>Points clés à retenir</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✓ Ligne discontinue = dépassement autorisé</div>
          <div style={keyPoint}>✓ Routes à 3 voies : se rabattre avant la 3ème flèche</div>
          <div style={keyPoint}>✓ Terre-plein central ≠ accès réglementé (vérifier le panneau)</div>
          <div style={keyPoint}>✓ Périphérique parisien limité à 50 km/h</div>
          <div style={keyPoint}>✓ À Paris : priorité à droite pour les véhicules entrants</div>
        </div>
      </SectionBlock>
    </div>
  )
}

// === COMPOSANTS RÉUTILISABLES ===

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

// === STYLES ===

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
