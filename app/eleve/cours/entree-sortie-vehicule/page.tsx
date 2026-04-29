'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

export default function Fiche2Page() {
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
          <div style={{ fontSize: 11, color: '#6b7394' }}>Prendre et quitter son véhicule</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Entrer et sortir du véhicule</h1>
      </div>

      {/* Intro */}
      <SectionBlock>
        <p style={text}>Monter et descendre de voiture peut sembler anodin, mais ces gestes comportent de vrais risques. Chaque année, de nombreux accidents — parfois mortels — surviennent à cause d'une portière ouverte sans vérification préalable, notamment avec des cyclistes ou des deux-roues.</p>
      </SectionBlock>

      {/* Entrer */}
      <SectionTitle>Monter dans le véhicule</SectionTitle>

      <SectionBlock>
        <p style={text}>Avant d'ouvrir votre portière pour entrer dans le véhicule, vous devez systématiquement effectuer plusieurs contrôles :</p>

        <TableBlock color="#4f6ef7" rows={[
          ['Vérification', 'Détail'],
          ['Contrôler l\'arrivée d\'usagers', 'Regardez devant et derrière vous. Un cycliste, un piéton ou un autre véhicule pourrait arriver au moment où vous ouvrez votre portière.'],
          ['Obstacles autour de la portière', 'Repérez les plots métalliques, les bordures en béton ou tout objet qui pourrait être heurté par votre portière.'],
          ['Position du siège', 'Vérifiez que le siège n\'est pas réglé trop près du volant, sinon vous risquez de cogner vos genoux en vous installant.'],
          ['Siège dégagé', 'Assurez-vous qu\'aucun objet n\'encombre le siège conducteur (sac, livre, bouteille...).'],
        ]} />

        <ImageBlock
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=500&h=300&fit=crop"
          caption="Vérifiez toujours la présence de cyclistes avant d'ouvrir votre portière"
        />
      </SectionBlock>

      {/* Vêtements */}
      <SectionTitle>S'habiller correctement pour conduire</SectionTitle>

      <SectionBlock>
        <p style={text}>On n'y pense pas toujours, mais vos vêtements et vos chaussures ont une influence directe sur votre capacité à conduire en sécurité.</p>

        <SubTitle>Les vêtements</SubTitle>
        <p style={text}>Les vêtements trop larges ou trop épais gênent vos mouvements et rendent l'accès aux commandes plus difficile. Un gros manteau d'hiver, par exemple, empêche la ceinture de sécurité de plaquer correctement contre votre corps, ce qui diminue considérablement son efficacité en cas de choc.</p>

        <Warning text="Retirez votre manteau ou votre blouson épais AVANT de vous installer et de mettre votre ceinture. Posez-le dans le coffre ou sur la banquette arrière. La ceinture doit être en contact direct avec votre corps pour fonctionner correctement." />

        <p style={text}>Veillez aussi à maintenir une température confortable dans l'habitacle : avoir trop chaud favorise la somnolence et l'endormissement au volant, tandis qu'avoir trop froid réduit la coordination de vos mouvements et ralentit vos réflexes.</p>

        <SubTitle>Les chaussures</SubTitle>
        <p style={text}>Pour bien conduire, il faut maîtriser parfaitement le jeu des pédales. Le choix de vos chaussures est donc crucial :</p>

        <TableBlock color="#4f6ef7" rows={[
          ['Type de chaussures', 'Adapté ?', 'Pourquoi'],
          ['Baskets, chaussures plates', '✅ Oui', 'Bonne sensation sur les pédales, pied bien maintenu'],
          ['Chaussures de ville basses', '✅ Oui', 'Semelle fine, bon contrôle'],
          ['Chaussures à talons hauts', '❌ Non', 'Appui instable, risque de rester coincé'],
          ['Tongues / tongs', '❌ Non', 'Glissent, se coincent sous les pédales'],
          ['Semelles très épaisses', '❌ Non', 'Aucune sensation sur les pédales'],
          ['Chaussures trop larges', '❌ Non', 'Risque d\'appuyer sur 2 pédales à la fois'],
        ]} />

        <Warning text="Des tongues ou des chaussures à talons qui restent coincées dans les pédales pendant que vous roulez, c'est extrêmement dangereux. Vous ne pourrez pas freiner à temps en cas d'urgence." />
      </SectionBlock>

      {/* Sortir */}
      <SectionTitle>Sortir du véhicule</SectionTitle>

      <SectionBlock>
        <p style={text}>La sortie du véhicule est un moment particulièrement dangereux, surtout du côté de la route. Voici la procédure à suivre impérativement :</p>

        <p style={text}><strong style={{ color: '#f0f2f8' }}>1.</strong> Regardez dans votre <strong style={{ color: '#f0f2f8' }}>rétroviseur intérieur</strong> pour vérifier ce qui arrive derrière vous.</p>
        <p style={text}><strong style={{ color: '#f0f2f8' }}>2.</strong> Regardez dans votre <strong style={{ color: '#f0f2f8' }}>rétroviseur extérieur</strong> (côté de votre portière).</p>
        <p style={text}><strong style={{ color: '#f0f2f8' }}>3.</strong> Vérifiez votre <strong style={{ color: '#e8ff47' }}>angle mort</strong> en tournant la tête : le danger peut ne pas apparaître dans les rétroviseurs !</p>
        <p style={text}><strong style={{ color: '#f0f2f8' }}>4.</strong> Ouvrez la portière progressivement, jamais en grand d'un coup.</p>

        <Tip text="La technique hollandaise : ouvrez votre portière avec la main droite (et non la gauche). Ce geste vous oblige naturellement à pivoter le buste vers l'extérieur, ce qui vous fait automatiquement vérifier l'angle mort. C'est la méthode enseignée par les moniteurs d'auto-école !" />

        <ImageBlock
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=300&fit=crop"
          caption="Tournez toujours la tête pour vérifier l'angle mort avant d'ouvrir"
        />

        <Warning text="Les enfants doivent TOUJOURS sortir du côté du trottoir. Ils n'ont pas le réflexe de vérifier la circulation et pourraient se retrouver face à un véhicule en ouvrant leur portière côté route." />

        <Tip text="En cas de panne sur le bord d'une route ou sur la bande d'arrêt d'urgence d'une autoroute, faites sortir TOUS les passagers — y compris vous-même — par le côté droit (côté passager), loin de la circulation à grande vitesse." />
      </SectionBlock>

      {/* Quitter */}
      <SectionTitle>Quitter et sécuriser le véhicule</SectionTitle>

      <SectionBlock>
        <p style={text}>Avant de vous éloigner définitivement du véhicule, vous devez vous assurer qu'il est correctement sécurisé et qu'il ne risque pas de bouger tout seul :</p>

        <TableBlock color="#4f6ef7" rows={[
          ['Action', 'Détail'],
          ['Serrer le frein à main', 'Obligatoire dans tous les cas, même sur terrain parfaitement plat'],
          ['Enclencher une vitesse', 'Uniquement si vous êtes stationné en pente ou en montée : 1ère en montée, marche arrière en descente'],
          ['Braquer les roues', 'En pente : tournez les roues vers le trottoir. En montée : tournez-les vers la route. Cela empêche le véhicule de dévaler si le frein à main lâche.'],
          ['Fermer les portières', 'Vérifiez que toutes les portières sont bien fermées et verrouillées'],
          ['Stationnement payant', 'Si la zone est payante, réglez le montant correspondant à la durée estimée de votre arrêt'],
        ]} />

        <Tip text="Boîte automatique : sélectionnez la position \"P\" (Parking) avant de couper le moteur. Attention : selon les modèles, cette position active ou non le frein à main automatiquement. Vérifiez toujours que le frein à main est bien serré en complément !" />

        <Warning text="Si vous êtes en panne hors agglomération ou sur autoroute (bande d'arrêt d'urgence), sortez toujours du côté droit du véhicule pour ne pas vous retrouver face à la circulation." />
      </SectionBlock>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, flexWrap: 'wrap', gap: 10 }}>
        <button onClick={() => router.push('/eleve/cours/verifications')} style={backBtn}>← Fiche précédente</button>
        <button onClick={() => router.push('/eleve/cours/installation-poste')} style={nextBtn}>Fiche suivante : Installation au poste →</button>
      </div>
    </div>
  )
}

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
      <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span><span>{text}</span>
    </div>
  )
}
function Warning({ text }: { text: string }) {
  return (
    <div style={{ background: 'rgba(255,79,79,.08)', border: '1px solid rgba(255,79,79,.25)', borderRadius: 10, padding: '14px 16px', margin: '14px 0', fontSize: 14, color: '#ff8f8f', lineHeight: 1.7, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span><span>{text}</span>
    </div>
  )
}
function TableBlock({ rows, color }: { rows: string[][]; color: string }) {
  const [header, ...body] = rows
  return (
    <div style={{ overflowX: 'auto', margin: '14px 0', borderRadius: 10, border: '1px solid #2a2f3d' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead><tr>{header.map((h, i) => <th key={i} style={{ padding: '11px 14px', background: color + '18', color, textAlign: 'left', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.3px' }}>{h}</th>)}</tr></thead>
        <tbody>{body.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: '10px 14px', borderTop: '1px solid #1e2230', color: j === 0 ? '#f0f2f8' : '#a0a8c0', fontWeight: j === 0 ? 600 : 400, lineHeight: 1.6 }}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

const text: React.CSSProperties = { fontSize: 14.5, lineHeight: 1.8, color: '#c0c8e0', marginBottom: 14 }
const badge: React.CSSProperties = { background: 'rgba(79,110,247,.15)', color: '#4f6ef7', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }
const backBtn: React.CSSProperties = { background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }
const nextBtn: React.CSSProperties = { background: 'rgba(79,110,247,.15)', color: '#4f6ef7', border: '1px solid rgba(79,110,247,.3)', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }
