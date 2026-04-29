'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'
import { SchemaChampVisuel, SchemaAnglesMorts, SchemaTempsReaction, SchemaEffetsFatigue, SchemaDistracteurs } from '../schemas'

export default function ConducteurPage() {
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
          <div style={badge}>Fiche 24</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>Le Conducteur</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>L'état du conducteur</h1>
      </div>

      {/* PARTIE 1 : LA VUE */}
      <SectionTitle>La vue</SectionTitle>

      <SectionBlock>
        <p style={text}>Avoir une bonne vue est une <strong style={{ color: '#e8ff47' }}>condition indispensable</strong> pour conduire.</p>

        <div style={keyPointsBox}>
          <div style={keyPoint}>👁️ <strong>Acuité visuelle minimale :</strong> 5/10 pour les deux yeux</div>
          <div style={keyPoint}>👓 Port de lunettes/lentilles obligatoire si nécessaire (mentionné sur le permis)</div>
          <div style={keyPoint}>🔄 Paire de secours obligatoire dans le véhicule</div>
        </div>

        <Tip text="Si vous êtes borgne ou qu'un œil a une acuité < 1/10, l'autre œil doit avoir minimum 5/10." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Visibilité des panneaux</SubTitle>
        <p style={text}>Les panneaux hors agglomération sont <strong style={{ color: '#f0f2f8' }}>deux fois plus grands</strong> que ceux en agglomération. Cette taille varie en fonction de la <strong style={{ color: '#e8ff47' }}>vitesse</strong>, et non du paysage.</p>

        <TableBlock color="#4f6ef7" rows={[
          ['Lieu', 'Distance de visibilité (10/10ème)'],
          ['Hors agglomération', '150 m'],
          ['En agglomération', '50 m']
        ]} />
      </SectionBlock>

      {/* PARTIE 2 : ATTENTION ET VIGILANCE */}
      <SectionTitle>L'attention et la vigilance</SectionTitle>

      <SectionBlock>
        <p style={text}>En 2021, un défaut d'attention (inattention, téléphone, distracteurs) est relevé chez un conducteur dans <strong style={{ color: '#e84855' }}>23% des accidents corporels</strong>, coûtant la vie à 369 personnes en France.</p>

        <SchemaChampVisuel />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Les distracteurs à éviter</SubTitle>
        
        <SchemaDistracteurs />

        <Warning text="Depuis le 1er juillet 2015 : TOUS les casques, oreillettes ou kits mains libres sont STRICTEMENT INTERDITS. Seuls les dispositifs intégrés au véhicule sont autorisés." />

        <Tip text="La monotonie du trajet (surtout sur autoroute) est un facteur de perte de vigilance. Faites des pauses régulièrement pour réactiver votre attention." />
      </SectionBlock>

      {/* PARTIE 3 : LA FATIGUE */}
      <SectionTitle>La fatigue</SectionTitle>

      <SectionBlock>
        <p style={text}>La fatigue est une des <strong style={{ color: '#e84855' }}>premières causes de mortalité</strong> sur les routes car elle diminue les capacités du conducteur et sa vigilance.</p>

        <Warning text="La fatigue génère jusqu'à 20% des accidents mortels. Sur autoroute : 1 accident mortel sur 3 est causé par un endormissement." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Les effets de la fatigue</SubTitle>
        
        <SchemaEffetsFatigue />

        <SchemaTempsReaction />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Conseils anti-fatigue</SubTitle>
        
        <div style={keyPointsBox}>
          <div style={keyPoint}>💤 Bien se reposer avant le voyage</div>
          <div style={keyPoint}>⏸️ Pause de 20 min toutes les 2 heures</div>
          <div style={keyPoint}>💧 Boire de l'eau et manger équilibré</div>
          <div style={keyPoint}>😴 Sieste de 15-20 min si besoin sur aire de repos</div>
          <div style={keyPoint}>🔄 Alterner les conducteurs si possible</div>
          <div style={keyPoint}>⏱️ Ne pas rouler plus de 8h dans une journée</div>
        </div>

        <Warning text="Ne vous fixez JAMAIS d'heure d'arrivée pour ne pas vous inciter à rouler plus vite ou plus longtemps." />
      </SectionBlock>

      {/* PARTIE 4 : LES CONTRÔLES */}
      <SectionTitle>Les contrôles : angles morts</SectionTitle>

      <SectionBlock>
        <p style={text}>Il est très important d'effectuer des <strong style={{ color: '#e8ff47' }}>contrôles réguliers</strong> devant, derrière et sur les côtés de votre véhicule.</p>

        <SchemaAnglesMorts />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Types de vision</SubTitle>
        
        <TableBlock color="#4f6ef7" rows={[
          ['Type de vision', 'Description'],
          ['Vision directe', 'Regarder sans les miroirs, en bougeant la tête'],
          ['Vision indirecte', 'Utiliser les rétroviseurs'],
          ['Angle mort', 'Zones invisibles en vision directe et indirecte']
        ]} />

        <Warning text="Toujours tourner la tête pour neutraliser les angles morts avant un virage ou un dépassement !" />
      </SectionBlock>

      {/* PARTIE 5 : MALADIES */}
      <SectionTitle>Maladies incompatibles avec la conduite</SectionTitle>

      <SectionBlock>
        <p style={text}>Certaines maladies nécessitent un examen médical régulier avec un <strong style={{ color: '#f0f2f8' }}>médecin agréé par la préfecture</strong> :</p>

        <div style={keyPointsBox}>
          <div style={keyPoint}>❤️ <strong>Hypertension artérielle</strong> : risque d'infarctus ou attaques cérébrales</div>
          <div style={keyPoint}>🩺 <strong>Diabète sévère</strong> : risque de maladies cardio-vasculaires</div>
          <div style={keyPoint}>🧠 <strong>Épilepsie</strong> : risque de pertes de connaissance et gestes incontrôlés</div>
        </div>

        <Tip text="Le daltonisme (troubles de la vision des couleurs) n'est PAS considéré comme gênant pour la conduite. La conduite reste autorisée." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Cas spéciaux</SubTitle>
        
        <p style={text}>• <strong style={{ color: '#f0f2f8' }}>Femmes enceintes</strong> : obligation de porter la ceinture (sauf ordonnance médicale à présenter en cas de contrôle)</p>
        
        <p style={text}>• <strong style={{ color: '#f0f2f8' }}>Perte d'usage d'un bras</strong> : consultation obligatoire d'un médecin agréé avant de reprendre la conduite. Adaptation du véhicule possible avec dossier technique.</p>
      </SectionBlock>

      {/* PARTIE 6 : ANTICIPATION */}
      <SectionTitle>L'anticipation</SectionTitle>

      <SectionBlock>
        <p style={text}>L'anticipation est la capacité de <strong style={{ color: '#e8ff47' }}>percevoir suffisamment tôt</strong> les situations, les analyser convenablement et prendre des décisions de conduite adaptées.</p>

        <Tip text="Seule l'anticipation permet de diminuer le temps de réaction car le conducteur sera prêt à agir plus rapidement." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Les indices utiles</SubTitle>
        
        <TableBlock color="#4f6ef7" rows={[
          ['Type d\'indices', 'Description', 'Exemples'],
          ['Indices formels', 'Signalisation officielle', 'Panneaux, marquages au sol'],
          ['Indices informels', 'Expérience, logique, bon sens', 'Bus arrêté = piétons possibles']
        ]} />

        <Warning text="Il n'y a PAS de priorité d'importance entre indices formels et informels. L'importance dépend de la situation !" />
      </SectionBlock>

      {/* POINTS CLÉS */}
      <SectionTitle>Points clés à retenir</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✓ Acuité visuelle minimum : 5/10 pour les deux yeux</div>
          <div style={keyPoint}>✓ Téléphone interdit : -3 points + 135€</div>
          <div style={keyPoint}>✓ Fatigue = 20% des accidents mortels</div>
          <div style={keyPoint}>✓ Pause 20 min toutes les 2 heures</div>
          <div style={keyPoint}>✓ Toujours vérifier les angles morts</div>
          <div style={keyPoint}>✓ Temps de réaction normal : environ 1 seconde</div>
          <div style={keyPoint}>✓ Anticipation = percevoir + analyser + décider</div>
          <div style={keyPoint}>✓ Oreillettes strictement interdites depuis 2015</div>
        </div>
      </SectionBlock>
    </div>
  )
}

// Composants réutilisables
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
  background: '#4f6ef7',
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
