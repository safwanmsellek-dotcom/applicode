'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

export default function Fiche1Page() {
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
          <div style={{ fontSize: 11, color: '#6b7394' }}>Prendre et quitter son véhicule</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Les vérifications du véhicule avant chaque départ</h1>
      </div>

      {/* Intro */}
      <SectionBlock>
        <p style={text}>Avant de prendre la route, certaines vérifications sont indispensables pour votre sécurité et celle des autres usagers. Elles ne prennent que quelques minutes et peuvent vous éviter une panne, un accident, ou une contravention.</p>
        <p style={text}>N'oubliez pas non plus de toujours avoir sur vous vos <strong style={{ color: '#e8ff47' }}>documents obligatoires</strong> : votre permis de conduire et le certificat d'immatriculation du véhicule (la carte grise).</p>
        <Tip text="Prenez l'habitude de faire un tour complet du véhicule avant chaque trajet. C'est un réflexe qui peut sauver des vies." />
      </SectionBlock>

      {/* Vérifications extérieures */}
      <SectionTitle>Les vérifications à l'extérieur</SectionTitle>

      <SectionBlock>
        <p style={text}>Avant même de monter dans votre voiture, plusieurs éléments doivent être inspectés à l'extérieur du véhicule.</p>
      </SectionBlock>

      {/* Pneumatiques */}
      <SubTitle>Les pneumatiques</SubTitle>

      <SectionBlock>
        <p style={text}>Les pneus sont votre unique point de contact avec la route. Leur état influence directement le freinage, la tenue de route et votre sécurité globale. Ils sont munis de <strong style={{ color: '#f0f2f8' }}>sculptures</strong> (les rainures en relief) qui permettent aux roues d'adhérer correctement au sol et d'évacuer l'eau en cas de pluie pour éviter de glisser.</p>

        <ImageBlock
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Tyre_tread_depth.jpg/400px-Tyre_tread_depth.jpg"
          caption="Le témoin d'usure TWI est une petite barre en relief au fond des rainures du pneu"
        />

        <p style={text}>Chaque pneu est équipé d'un <strong style={{ color: '#f0f2f8' }}>témoin d'usure</strong>, souvent repéré par les lettres <strong style={{ color: '#e8ff47' }}>"TWI"</strong> (Tread Wear Indicator) gravées sur le flanc du pneu. Ce témoin est une petite barre en relief située au fond des rainures. Au fil des kilomètres, la surface des sculptures s'use et se rapproche du niveau de ce témoin. Le jour où la gomme arrive au même niveau que le témoin, le pneu est usé et doit être remplacé sans attendre.</p>

        <Warning text="Quand la surface du pneu est au même niveau que le témoin d'usure, il est impératif de changer le pneu immédiatement ! En dessous de 1,6 mm de profondeur de sculpture, le pneu est hors la loi et dangereux." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>La bande de roulement et les flancs</SubTitle>
        <p style={text}>Inspectez visuellement la surface du pneu ainsi que ses côtés (les flancs). Recherchez la présence de <strong style={{ color: '#f0f2f8' }}>clous, vis, déchirures ou hernies</strong> (des bosses qui apparaissent sur le côté du pneu). Si vous repérez l'un de ces problèmes, il faut faire remplacer le pneu sans tarder : le risque d'éclatement en roulant est réel et très dangereux.</p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Vérifier le gonflage et la pression</SubTitle>
        <p style={text}>Avant chaque départ, jetez un oeil rapide à vos pneus pour vérifier qu'ils ne semblent pas anormalement aplatis au sol. Un pneu qui paraît "mou" ou dont la bande de roulement est plus écrasée que d'habitude peut souffrir d'une <strong style={{ color: '#f0f2f8' }}>crevaison lente</strong> : un petit clou ou une vis qui laisse l'air s'échapper progressivement. Notez cependant qu'il est tout à fait normal qu'un pneu perde un peu de pression au fil du temps, même sans crevaison.</p>

        <ImageBlock
          src="https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&h=300&fit=crop"
          caption="Vérifiez régulièrement la pression de vos pneus, idéalement à froid"
        />

        <p style={text}>Un pneu mal gonflé — qu'il soit <strong style={{ color: '#f0f2f8' }}>sous-gonflé ou sur-gonflé</strong> — présente des risques importants :</p>

        <TableBlock color="#4f6ef7" rows={[
          ['Problème', 'Conséquences'],
          ['Pneu sous-gonflé', 'Adhérence réduite, distance de freinage allongée, risque d\'éclatement, consommation de carburant en hausse'],
          ['Pneu sur-gonflé', 'Surface de contact réduite, usure anormale au centre, risque d\'éclatement'],
        ]} />

        <Tip text="Contrôlez la pression de vos pneus au moins une fois par mois, et systématiquement avant un long trajet. La pression recommandée est indiquée dans le manuel du véhicule ou sur une étiquette collée à l'intérieur de la portière conducteur." />
      </SectionBlock>

      {/* Vitres, phares, rétros */}
      <SectionTitle>Vitres, phares, rétroviseurs et plaques</SectionTitle>

      <SectionBlock>
        <p style={text}>Les phares de votre véhicule remplissent une double fonction essentielle : <strong style={{ color: '#e8ff47' }}>voir et être vu</strong>. Il est donc primordial qu'ils soient propres, en bon état, et qu'aucune casse ni saleté ne vienne diminuer leur puissance lumineuse.</p>

        <ImageBlock
          src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&h=300&fit=crop"
          caption="Des phares propres garantissent une bonne visibilité, surtout de nuit"
        />

        <p style={text}>Les <strong style={{ color: '#f0f2f8' }}>plaques d'immatriculation</strong> (avant et arrière) ainsi que les petites lumières qui les éclairent doivent être parfaitement propres et lisibles. Des plaques sales ou illisibles sont une infraction et doivent être nettoyées ou réparées rapidement.</p>

        <p style={text}>Vérifiez le bon fonctionnement de <strong style={{ color: '#f0f2f8' }}>chaque type de feu</strong>, un par un :</p>

        <TableBlock color="#4f6ef7" rows={[
          ['Type de feu', 'À vérifier'],
          ['Feux de position (veilleuses)', 'Fonctionnels avant et arrière'],
          ['Feux de croisement', 'Les deux fonctionnent'],
          ['Feux de route', 'Les deux fonctionnent'],
          ['Clignotants', 'Avant, arrière et latéraux'],
          ['Feux stop', 'S\'allument bien en appuyant sur le frein'],
          ['Feux de brouillard', 'Avant et arrière opérationnels'],
          ['Feu de recul', 'S\'allume en passant la marche arrière'],
        ]} />

        <p style={text}>Si une ampoule est grillée, remplacez-la immédiatement. Rouler avec un feu défaillant est dangereux et sanctionnable.</p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Rétroviseurs et vitres</SubTitle>
        <p style={text}>Les <strong style={{ color: '#f0f2f8' }}>rétroviseurs extérieurs</strong> et toutes les <strong style={{ color: '#f0f2f8' }}>vitres</strong> du véhicule doivent être propres et bien transparents pour vous garantir une visibilité maximale. Pensez à laver régulièrement l'extérieur de vos vitres.</p>
        <p style={text}>Portez une attention particulière au <strong style={{ color: '#f0f2f8' }}>pare-brise</strong> : un éclat (un petit impact) traité rapidement chez un garagiste peut être stabilisé et réparé facilement. En revanche, si vous le laissez sans traitement, la fissure va s'agrandir progressivement jusqu'à imposer le remplacement complet du pare-brise — bien plus coûteux !</p>

        <Tip text="Un éclat sur le pare-brise ? Faites-le traiter rapidement ! La réparation est souvent gratuite (prise en charge par l'assurance) et évite un remplacement complet." />
      </SectionBlock>

      {/* État général */}
      <SectionTitle>État général et situation du véhicule</SectionTitle>

      <SectionBlock>
        <p style={text}>Avant chaque départ, prenez l'habitude de faire <strong style={{ color: '#f0f2f8' }}>le tour complet de votre véhicule</strong>. Cela vous permet de repérer tout dommage visible qui pourrait s'avérer dangereux : un pare-choc décroché, un élément de carrosserie abîmé, un feu cassé...</p>

        <ImageBlock
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=300&fit=crop"
          caption="Faites un tour complet du véhicule pour repérer tout problème"
        />

        <p style={text}>Profitez de cette inspection pour vérifier qu'il n'y a pas de <strong style={{ color: '#f0f2f8' }}>traces de fuite de liquide au sol</strong> sous votre véhicule (huile, liquide de refroidissement, liquide de frein...). Si vous repérez une flaque suspecte, faites examiner votre voiture par un garagiste avant de prendre la route.</p>

        <p style={text}>Vérifiez aussi que vous disposez de <strong style={{ color: '#f0f2f8' }}>suffisamment d'espace pour manoeuvrer</strong> en sortant de votre place de stationnement. Attention aux bornes en béton, aux poteaux ou aux trottoirs hauts qui pourraient frotter ou endommager votre véhicule en reculant.</p>

        <Warning text="S'il a neigé, vous devez dégager la neige de TOUTES les surfaces du véhicule : toit, capot, vitres, phares — pas seulement le pare-brise. La neige sur le toit peut glisser sur votre pare-brise en freinant, ou s'envoler et gêner les conducteurs derrière vous. Pensez aussi à libérer la neige autour des roues pour éviter de patiner au démarrage." />
      </SectionBlock>

      {/* Vérifications intérieures */}
      <SectionTitle>Les vérifications à l'intérieur</SectionTitle>

      <SectionBlock>
        <p style={text}>Une fois installé dans le véhicule, mais avant de démarrer le moteur, effectuez ces vérifications rapides :</p>

        <TableBlock color="#4f6ef7" rows={[
          ['Vérification', 'Ce qu\'il faut faire'],
          ['Position du siège', 'Suffisamment reculé pour s\'asseoir sans cogner les genoux au volant. Effectuez tous les réglages nécessaires du siège et du volant.'],
          ['Objets sur le siège', 'Retirez tout ce qui encombre : livres, bouteilles, sacs... Rien ne doit gêner votre installation.'],
          ['Levier de vitesses', 'Vérifiez qu\'aucune vitesse n\'est enclenchée. Si c\'est le cas, repassez au point mort en ramenant le levier au centre.'],
          ['Ceintures de sécurité', 'Assurez-vous que tous les passagers disposent d\'une ceinture fonctionnelle et qu\'ils l\'attachent.'],
          ['Rétroviseur intérieur', 'Il doit être propre. Réglez-le (ainsi que les rétroviseurs extérieurs) pour une vision optimale.'],
          ['Vitres intérieures', 'Elles ne doivent pas être sales, embuées ou obstruées par des objets (GPS mal positionné, désodorisant qui pend...).'],
        ]} />

        <Tip text="Si vous partez de nuit, pensez à vérifier le bon fonctionnement du plafonnier au cas où vous auriez besoin de lumière dans l'habitacle pour chercher quelque chose." />
      </SectionBlock>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, flexWrap: 'wrap', gap: 10 }}>
        <button onClick={() => router.push('/eleve/cours')} style={backBtn}>← Retour aux fiches</button>
        <button onClick={() => router.push('/eleve/cours/entree-sortie-vehicule')} style={nextBtn}>Fiche suivante : Entrer et sortir →</button>
      </div>
    </div>
  )
}

// --- Composants réutilisables ---
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 20, fontWeight: 700, color: '#e8ff47', marginTop: 36, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #2a2f3d' }}>{children}</h2>
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f2f8', marginTop: 20, marginBottom: 10 }}>{children}</h3>
}

function SectionBlock({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: 20 }}>{children}</div>
}

function ImageBlock({ src, caption }: { src: string; caption: string }) {
  return (
    <div style={{ margin: '18px 0', textAlign: 'center' }}>
      <img src={src} alt={caption} style={{ width: '100%', maxWidth: 500, borderRadius: 12, border: '1px solid #2a2f3d' }} />
      <p style={{ fontSize: 12, color: '#6b7394', marginTop: 8 }}>{caption}</p>
    </div>
  )
}

function Tip({ text }: { text: string }) {
  return (
    <div style={{ background: 'rgba(61,255,160,.08)', border: '1px solid rgba(61,255,160,.25)', borderRadius: 10, padding: '14px 16px', margin: '14px 0', fontSize: 14, color: '#3dffa0', lineHeight: 1.7, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
      <span>{text}</span>
    </div>
  )
}

function Warning({ text }: { text: string }) {
  return (
    <div style={{ background: 'rgba(255,79,79,.08)', border: '1px solid rgba(255,79,79,.25)', borderRadius: 10, padding: '14px 16px', margin: '14px 0', fontSize: 14, color: '#ff8f8f', lineHeight: 1.7, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
      <span>{text}</span>
    </div>
  )
}

function TableBlock({ rows, color }: { rows: string[][]; color: string }) {
  const [header, ...body] = rows
  return (
    <div style={{ overflowX: 'auto', margin: '14px 0', borderRadius: 10, border: '1px solid #2a2f3d' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>{header.map((h, i) => <th key={i} style={{ padding: '11px 14px', background: color + '18', color, textAlign: 'left', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.3px' }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: '10px 14px', borderTop: '1px solid #1e2230', color: j === 0 ? '#f0f2f8' : '#a0a8c0', fontWeight: j === 0 ? 600 : 400, lineHeight: 1.6 }}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const text: React.CSSProperties = { fontSize: 14.5, lineHeight: 1.8, color: '#c0c8e0', marginBottom: 14 }
const badge: React.CSSProperties = { background: 'rgba(79,110,247,.15)', color: '#4f6ef7', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }
const backBtn: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }
const nextBtn: React.CSSProperties = { background: 'rgba(79,110,247,.15)', color: '#4f6ef7', border: '1px solid rgba(79,110,247,.3)', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }
