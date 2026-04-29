'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

export default function ChoixVoiesPlacementPage() {
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
          <div style={badge}>Fiche 81</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>Règles de Circulation</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Choix des voies et placement</h1>
      </div>

      {/* Intro */}
      <SectionBlock>
        <p style={text}>Chaque véhicule occupe une <strong style={{ color: '#e8ff47' }}>place précise</strong> selon la direction et la signalisation. Tout changement de voie nécessite des contrôles et l'utilisation des clignotants.</p>
      </SectionBlock>

      {/* Procédure de changement de voie */}
      <SectionTitle>Procédure de changement de voie</SectionTitle>

      <SectionBlock>
        <p style={text}>Changer de voie est une manœuvre qui demande de la rigueur. Voici les 5 étapes obligatoires à respecter dans l'ordre :</p>

        <div style={{ background: '#1a2332', border: '2px solid #4f6ef7', borderRadius: 16, padding: '24px', marginTop: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#4f6ef7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, flexShrink: 0 }}>1</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Rétroviseur intérieur</div>
                <div style={{ fontSize: 14, color: '#b8c5d6' }}>Vérifier ce qui se passe derrière vous</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#4f6ef7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, flexShrink: 0 }}>2</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Rétroviseur extérieur</div>
                <div style={{ fontSize: 14, color: '#b8c5d6' }}>Du côté où vous allez</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#4f6ef7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, flexShrink: 0 }}>3</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Clignotant</div>
                <div style={{ fontSize: 14, color: '#b8c5d6' }}>Signaler votre intention avant de déboîter</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#4f6ef7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, flexShrink: 0 }}>4</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Angle mort</div>
                <div style={{ fontSize: 14, color: '#b8c5d6' }}>Tourner la tête pour vérifier la zone invisible</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#4f6ef7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, flexShrink: 0 }}>5</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Changer de voie</div>
                <div style={{ fontSize: 14, color: '#b8c5d6' }}>Progressivement et en douceur</div>
              </div>
            </div>
          </div>
        </div>

        <Warning text="Ne jamais changer de voie brusquement ou sans vérifier les angles morts. Les deux-roues sont souvent invisibles dans les rétroviseurs !" />
      </SectionBlock>

      {/* Placement sans marquage */}
      <SectionTitle>Placement sans marquage au sol</SectionTitle>

      <SectionBlock>
        <p style={text}>Lorsqu'il n'y a pas de marquage au sol, le placement dépend de votre direction et de la situation :</p>

        <div style={keyPointsBox}>
          <div style={keyPoint}>🚗 <strong>Marche normale :</strong> Toujours à droite, près du bord de la chaussée</div>
          <div style={keyPoint}>↩️ <strong>Pour tourner à gauche :</strong> Voie de gauche ou près de la ligne médiane (les autres peuvent vous dépasser par la droite)</div>
          <div style={keyPoint}>🛣️ <strong>Hors agglomération :</strong> Rouler le plus à droite possible, voies de gauche = dépassement uniquement</div>
        </div>

        <Tip text="En marche normale, même si la voie est large, restez toujours à droite. C'est une règle fondamentale de la circulation." />
      </SectionBlock>

      {/* Placement avec marquage */}
      <SectionTitle>Placement avec marquage au sol</SectionTitle>

      <SectionBlock>
        <p style={text}>Le marquage au sol vous indique clairement quelle voie emprunter selon votre direction :</p>

        <div style={keyPointsBox}>
          <div style={keyPoint}>➡️ <strong>Flèches directionnelles :</strong> Suivez les flèches marquées au sol</div>
          <div style={keyPoint}>↔️ <strong>2 voies, mêmes flèches :</strong> Placez-vous le plus à droite possible</div>
          <div style={keyPoint}>🚧 <strong>Voie droite encombrée :</strong> Utilisez la voie libre (si même fléchage)</div>
          <div style={keyPoint}>⚠️ <strong>3 flèches de rabattement :</strong> Danger ! Rabattez-vous AVANT la 3ème flèche</div>
        </div>

        <div style={{ background: '#2a1a1a', border: '2px solid #e84855', borderRadius: 12, padding: 20, marginTop: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#e84855', marginBottom: 12 }}>🔺 Flèches de rabattement</div>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: '#e6b8b8' }}>
            Sur les routes à 3 voies, des flèches vous indiquent quand quitter la voie centrale :
            <br/><br/>
            <strong>1ère flèche</strong> = Attention, préparez-vous<br/>
            <strong>2ème flèche</strong> = Rabattez-vous maintenant<br/>
            <strong>3ème flèche</strong> = Trop tard ! Vous devez déjà être rabattu
          </div>
        </div>

        <Tip text="Les fléchages doubles permettent le dépassement ou la présélection vers la voie de gauche sans obligation immédiate de changer." />
      </SectionBlock>

      {/* Placement avec panneaux */}
      <SectionTitle>Placement avec panneaux de présignalisation</SectionTitle>

      <SectionBlock>
        <p style={text}>Les panneaux de présignalisation sont visibles de plus loin que le marquage au sol. Ils sont particulièrement utiles en circulation dense.</p>

        <SubTitle>Feux lumineux au-dessus des voies</SubTitle>
        <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 20, marginTop: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 28 }}>🟢</div>
              <div>
                <strong style={{ color: '#10b981' }}>Flèche verte</strong> = Voie libre, vous pouvez circuler
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 28 }}>❌</div>
              <div>
                <strong style={{ color: '#e84855' }}>Croix rouge</strong> = Voie interdite, ne pas s'y engager
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 28 }}>🟠</div>
              <div>
                <strong style={{ color: '#f59e0b' }}>Flèche orange oblique</strong> = Rabattez-vous sur la voie indiquée
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* Points clés */}
      <SectionTitle>Points clés à retenir</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✓ Changement de voie = 5 étapes dans l'ordre (rétros, clignotant, angle mort, déboîter)</div>
          <div style={keyPoint}>✓ Sans marquage : toujours à droite en marche normale</div>
          <div style={keyPoint}>✓ Avec marquage : suivre les flèches directionnelles</div>
          <div style={keyPoint}>✓ 3 flèches de rabattement = se rabattre AVANT la 3ème</div>
          <div style={keyPoint}>✓ Hors agglo : voies de gauche réservées au dépassement</div>
          <div style={keyPoint}>✓ Feux au-dessus des voies : vert = libre, croix rouge = interdite</div>
          <div style={keyPoint}>✓ Toujours vérifier les angles morts avant de changer de voie</div>
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
  color: '#d0d2e0',
  lineHeight: 1.6
}
