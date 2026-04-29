'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

export default function Fiche3Page() {
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
          <div style={badge}>Fiche 3</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>Prendre et quitter son véhicule</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Installation au poste de conduite</h1>
      </div>

      {/* Intro */}
      <SectionBlock>
        <p style={text}>Une bonne installation au poste de conduite est la base de tout. Elle garantit votre sécurité et celle de vos passagers, assure une meilleure maîtrise du véhicule, et diminue la fatigue liée à la conduite — surtout sur les longs trajets.</p>

        <Warning text="Le Code de la route exige que le conducteur soit en permanence « en état et en position d'exécuter commodément et sans délai toutes les manoeuvres qui lui incombent ». Toute position rendant difficile l'accès aux commandes est sanctionnée par une amende de 35€ (contravention de 2ème classe)." />
      </SectionBlock>

      {/* Réglage du siège */}
      <SectionTitle>Régler son siège</SectionTitle>

      <SectionBlock>
        <p style={text}>Le réglage du siège est la toute première chose à faire en s'installant. Il conditionne votre distance aux pédales, votre vision de la route et votre maîtrise du volant. Un bon réglage vous permettra de :</p>

        <p style={text}>• <strong style={{ color: '#f0f2f8' }}>Bien voir la route</strong>, les yeux étant positionnés au centre du pare-brise</p>
        <p style={text}>• <strong style={{ color: '#f0f2f8' }}>Agir efficacement sur les pédales</strong>, rapidement et confortablement</p>
        <p style={text}>• <strong style={{ color: '#f0f2f8' }}>Réduire la fatigue</strong> liée à une mauvaise posture prolongée</p>

        <Warning text="Rappel important : le pied gauche est exclusivement dédié à la pédale d'embrayage (à gauche). Le pied droit gère les deux autres pédales : le frein (au milieu) et l'accélérateur (à droite). Ne mélangez jamais les pieds !" />

        <ImageBlock
          src="https://images.unsplash.com/photo-1449965408869-ebd13bc0c322?w=500&h=300&fit=crop"
          caption="Un bon réglage du siège assure confort et sécurité"
        />

        <p style={text}>Procédez aux réglages dans cet ordre :</p>

        <TableBlock color="#4f6ef7" rows={[
          ['Réglage', 'Comment procéder', 'Le bon indicateur'],
          ['1. Profondeur (avant/arrière)', 'Faites coulisser le siège', 'Votre jambe gauche doit rester semi-fléchie quand vous appuyez à fond sur l\'embrayage'],
          ['2. Hauteur', 'Montez ou descendez l\'assise', 'Vos yeux doivent être bien centrés sur le pare-brise'],
          ['3. Inclinaison du dossier', 'Réglez l\'angle du dossier', 'Vos bras doivent être légèrement fléchis quand vos mains sont sur le volant'],
          ['4. Appuie-tête', 'Montez ou descendez l\'appuie-tête', 'Le sommet de votre tête doit être au même niveau que le haut de l\'appuie-tête'],
        ]} />

        <p style={text}>Une fois la bonne position trouvée et tant que vous n'êtes pas en situation de conduite, posez le <strong style={{ color: '#f0f2f8' }}>pied gauche talon au sol face à l'embrayage</strong> et le <strong style={{ color: '#f0f2f8' }}>pied droit talon au sol face au frein</strong>.</p>
      </SectionBlock>

      {/* Appuie-tête */}
      <SectionBlock>
        <SubTitle>L'appuie-tête : un vrai équipement de sécurité</SubTitle>

        <p style={text}>Contrairement à ce que beaucoup pensent, l'appuie-tête n'est pas là uniquement pour le confort. C'est un <strong style={{ color: '#e8ff47' }}>dispositif de sécurité essentiel</strong> qui protège vos cervicales en cas de collision arrière. Sans lui, ou avec un mauvais réglage, vous risquez un traumatisme cervical — le fameux <strong style={{ color: '#f0f2f8' }}>"coup du lapin"</strong> — qui peut avoir des conséquences graves et durables.</p>

        <ImageBlock
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=300&fit=crop"
          caption="L'appuie-tête doit être au niveau du sommet de votre crâne"
        />

        <Tip text="Le haut de l'appuie-tête doit être aligné avec le sommet de votre tête, pas avec votre nuque. Un appuie-tête trop bas ne protégera pas correctement vos cervicales." />

        <Warning text="Si vous portez une pince à cheveux, un chignon avec un élément dur, ou un chapeau rigide, retirez-les ou déplacez-les avant de conduire. En cas de choc arrière, ces objets pourraient vous blesser le cuir chevelu en étant plaqués contre l'appuie-tête." />
      </SectionBlock>

      {/* Volant */}
      <SectionTitle>Régler le volant</SectionTitle>

      <SectionBlock>
        <p style={text}>Sur de nombreux modèles de voiture, le volant est réglable en hauteur et en profondeur. N'hésitez pas à utiliser ces réglages pour trouver la position la plus confortable et la plus sûre. Vos bras doivent rester légèrement fléchis quand vos mains sont posées sur le volant, sans avoir à tendre les bras ni à être trop près.</p>

        <ImageBlock
          src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=500&h=300&fit=crop"
          caption="Position correcte des mains sur le volant : 9h15 ou 10h10"
        />
      </SectionBlock>

      {/* Rétroviseurs */}
      <SectionTitle>Régler les rétroviseurs</SectionTitle>

      <SectionBlock>
        <p style={text}>Les rétroviseurs sont littéralement <strong style={{ color: '#e8ff47' }}>vos yeux vers l'arrière</strong>. Le danger sur la route vient essentiellement de derrière vous, et seuls des rétroviseurs correctement réglés peuvent vous assurer une sécurité maximale.</p>

        <p style={text}>Le réglage des <strong style={{ color: '#f0f2f8' }}>rétroviseurs extérieurs</strong> se fait généralement depuis une commande située sur la portière (électrique sur les voitures récentes, mécanique sur les plus anciennes). Le <strong style={{ color: '#f0f2f8' }}>rétroviseur intérieur</strong> se règle directement à la main en ajustant son inclinaison.</p>

        <Tip text="Vous devez pouvoir consulter le rétroviseur intérieur d'un simple mouvement des yeux, sans avoir à tourner la tête." />

        <p style={text}>Voici ce que vous devez voir dans chaque rétroviseur :</p>

        <TableBlock color="#4f6ef7" rows={[
          ['Rétroviseur', 'Ce que vous devez y voir'],
          ['Intérieur', 'Le haut de la vitre arrière et une partie des appuie-têtes des sièges arrière'],
          ['Extérieur droit', 'La poignée de la portière droite visible en bas du miroir'],
          ['Extérieur gauche', 'La poignée de la portière gauche visible en bas du miroir'],
        ]} />

        <Warning text="Les rétroviseurs doivent être réglés uniquement pour la sécurité du conducteur : pour surveiller la route derrière et sur les côtés. Ne les réglez pas pour mieux voir vos enfants à l'arrière ou pour aider un accompagnateur en conduite accompagnée — cela compromet votre sécurité." />
      </SectionBlock>

      {/* Ceinture */}
      <SectionTitle>Mettre sa ceinture de sécurité</SectionTitle>

      <SectionBlock>
        <p style={text}>Après avoir réglé le siège, le volant et les rétroviseurs, la dernière étape avant de démarrer est d'attacher votre ceinture de sécurité. C'est un équipement de <strong style={{ color: '#f0f2f8' }}>sécurité passive</strong> : elle ne prévient pas l'accident, mais elle limite considérablement les blessures si un accident se produit.</p>

        <SubTitle>Comment la ceinture fonctionne</SubTitle>
        <p style={text}>On l'appelle <strong style={{ color: '#e8ff47' }}>"ceinture trois points"</strong> car elle possède trois points d'attache sur le véhicule. Le bandeau passe par trois zones particulièrement résistantes de votre corps : la <strong style={{ color: '#f0f2f8' }}>clavicule</strong>, la <strong style={{ color: '#f0f2f8' }}>hanche droite</strong> et la <strong style={{ color: '#f0f2f8' }}>hanche gauche</strong>.</p>

        <SubTitle>Les règles pour un port correct</SubTitle>

        <TableBlock color="#4f6ef7" rows={[
          ['Règle', 'Explication'],
          ['Bandeau bien à plat', 'La ceinture ne doit jamais être torsadée (risque de pincement et de blessure en cas de choc)'],
          ['Pas sur le cou', 'Le bandeau supérieur passe sur la clavicule, jamais contre le cou — risque de brûlures et de blessures aux oreilles'],
          ['Pas sous le bras', 'Le bandeau ne passe jamais sous l\'aisselle — risque d\'hématomes et de côtes cassées en cas de choc'],
          ['Pas par-dessus un manteau', 'La ceinture doit être au contact de votre corps, pas sur une épaisseur de vêtement'],
        ]} />

        <ImageBlock
          src="https://images.unsplash.com/photo-1562519776-b232d22af15e?w=500&h=300&fit=crop"
          caption="La ceinture doit être à plat, sur la clavicule et les hanches"
        />

        <Warning text="N'utilisez jamais de \"pince de ceinture\" ou de clip pour détendre la ceinture. Ces dispositifs ne sont généralement pas homologués et peuvent empêcher la ceinture de fonctionner correctement lors d'un accident, provoquant des blessures supplémentaires." />

        <Tip text="Le port de la ceinture est aussi obligatoire pour les femmes enceintes. Seule une ordonnance d'un médecin agréé par la préfecture peut accorder une dispense, en raison de la morphologie." />

        <SubTitle>Les sanctions</SubTitle>
        <p style={text}>L'absence de port de la ceinture de sécurité constitue une <strong style={{ color: '#ff8f8f' }}>contravention de 4ème classe</strong> :</p>

        <TableBlock color="#ff4f4f" rows={[
          ['Sanction', 'Montant'],
          ['Amende forfaitaire', '135€'],
          ['Points retirés', '3 points'],
          ['Responsabilité conducteur', 'Passagers mineurs non attachés = c\'est le conducteur qui est sanctionné'],
        ]} />

        <p style={text}>Le conducteur n'est pas tenu responsable pour ses passagers majeurs qui ne portent pas leur ceinture — chaque adulte est responsable pour lui-même. En revanche, il est pénalement responsable si des <strong style={{ color: '#f0f2f8' }}>passagers mineurs</strong> ne sont pas correctement attachés.</p>
      </SectionBlock>

      {/* Position des mains */}
      <SectionTitle>Tenir le volant correctement</SectionTitle>

      <SectionBlock>
        <p style={text}>En ligne droite, vos mains doivent être positionnées symétriquement sur le volant, en position <strong style={{ color: '#e8ff47' }}>9h15</strong> ou <strong style={{ color: '#e8ff47' }}>10h10</strong> (imaginez les aiguilles d'une horloge). Cette position offre le meilleur compromis entre maîtrise et confort.</p>

        <p style={text}>Gardez toujours une prise souple mais ferme. Serrer trop fort le volant provoque des tensions et de la fatigue, surtout sur les longs trajets.</p>

        <Warning text="N'attrapez jamais le volant par l'intérieur de la couronne (paume de la main tournée vers l'intérieur). En cas de déclenchement de l'airbag ou de mouvement brusque du volant, vos poignets et vos bras pourraient être gravement blessés." />

        <Tip text="La position 9h15 est aujourd'hui la plus recommandée par les moniteurs. Elle laisse de l'espace pour l'airbag et permet une amplitude de rotation maximale." />
      </SectionBlock>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, flexWrap: 'wrap', gap: 10 }}>
        <button onClick={() => router.push('/eleve/cours/entree-sortie-vehicule')} style={backBtn}>← Fiche précédente</button>
        <button onClick={() => router.push('/eleve/quiz?mode=training')} style={nextBtn}>🎯 Tester mes connaissances →</button>
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
