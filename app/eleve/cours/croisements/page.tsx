'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

export default function CroisementsPage() {
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
          <div style={badge}>Fiche 82</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>Règles de Circulation</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Les croisements</h1>
      </div>

      <SectionBlock>
        <div style={{ background: '#3a1a1a', border: '2px solid #e84855', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#e84855', marginBottom: 8 }}>⚠️ Danger mortel</div>
          <div style={{ fontSize: 15, color: '#e6b8b8' }}>
            Les collisions frontales représentent <strong>22% des tués sur la route</strong>. Bien gérer les croisements peut vous sauver la vie.
          </div>
        </div>
      </SectionBlock>

      <SectionTitle>Croisements sur routes planes</SectionTitle>

      <SectionBlock>
        <SubTitle>Règle générale</SubTitle>
        <p style={text}>Lorsque vous croisez un véhicule qui arrive en face, <strong style={{ color: '#e8ff47' }}>serrez à droite</strong> pour laisser suffisamment d'espace.</p>

        <SubTitle>Obstacle de votre côté</SubTitle>
        <div style={{ background: '#1a2332', border: '1px solid #4f6ef7', borderRadius: 12, padding: 20, marginTop: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🚧 Qui est prioritaire ?</div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#b8c5d6' }}>
            Si l'obstacle (stationnement, travaux, rétrécissement) est <strong>de votre côté</strong>, c'est VOUS qui cédez le passage. Le véhicule d'en face est prioritaire car sa voie est libre.
          </p>
        </div>

        <SubTitle>Chaussée étroite</SubTitle>
        <div style={keyPointsBox}>
          <div style={keyPoint}>🚛 <strong>Le plus gros véhicule laisse passer le plus petit</strong></div>
          <div style={{ fontSize: 13, color: '#6b7394', marginLeft: 24 }}>
            Véhicule considéré comme "gros" : plus de 2m de large ET plus de 7m de long
          </div>
          <div style={keyPoint}>🚌 <strong>Bus en agglomération :</strong> Facilité de passage (cédez-leur)</div>
        </div>

        <Warning text="Si un véhicule est déjà engagé même si vous êtes prioritaire : ne forcez PAS le passage. Attendez qu'il ait terminé sa manœuvre." />
      </SectionBlock>

      <SectionTitle>Pont étroit : panneaux de priorité</SectionTitle>

      <SectionBlock>
        <p style={text}>Sur les ponts étroits, des panneaux indiquent qui est prioritaire. Il existe deux types de panneaux :</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
          <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981', marginBottom: 10 }}>Panneau d'interdiction</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: '#d0d2e0' }}>
              <strong>Flèche noire ↑</strong> = Vous prioritaire<br/>
              <strong>Flèche rouge ↓</strong> = Cédez le passage
            </div>
          </div>

          <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>Panneau d'indication</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: '#d0d2e0' }}>
              <strong>Flèche blanche ↑</strong> = Vous prioritaire<br/>
              <strong>Flèche rouge ↓</strong> = Cédez le passage
            </div>
          </div>
        </div>

        <Tip text="Retenez : Votre flèche (noire ou blanche) vers le haut = vous êtes prioritaire. Flèche rouge vers le bas = vous cédez." />
      </SectionBlock>

      <SectionTitle>Croisements en descente (montagne)</SectionTitle>

      <SectionBlock>
        <div style={{ background: '#2a1a1a', border: '2px solid #e84855', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#e84855', marginBottom: 8 }}>📍 Règle d'or</div>
          <div style={{ fontSize: 15, color: '#e6b8b8' }}>
            C'est <strong>TOUJOURS</strong> au véhicule qui descend de s'arrêter en premier
          </div>
        </div>

        <SubTitle>Pourquoi cette règle ?</SubTitle>
        <p style={text}>Le véhicule qui monte a plus de difficulté à redémarrer (risque de caler, recul). Il est donc plus logique que celui qui descend s'arrête.</p>

        <SubTitle>Situations particulières</SubTitle>
        <div style={keyPointsBox}>
          <div style={keyPoint}>🔄 <strong>Croisement impossible :</strong> Le véhicule seul recule pour laisser passer la remorque</div>
          <div style={keyPoint}>🚗→🚛 <strong>Véhicule léger vs lourd :</strong> Le léger recule pour le lourd</div>
          <div style={keyPoint}>↕️ <strong>Même gabarit :</strong> Celui qui descend recule</div>
          <div style={keyPoint}>🅿️ <strong>Espace d'évitement :</strong> Celui qui a l'espace de son côté s'arrête</div>
          <div style={keyPoint}>🚛🆚🚌 <strong>Camion vs autocar :</strong> C'est TOUJOURS le camion qui recule</div>
        </div>

        <div style={{ background: '#1a3a1a', border: '1px solid #2d5a2d', borderRadius: 12, padding: 18, marginTop: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#b8e6b8', marginBottom: 10 }}>💡 Astuce de mémorisation</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: '#b8e6b8' }}>
            <strong>En montagne :</strong><br/>
            → Qui monte = priorité (plus difficile à redémarrer)<br/>
            → Qui descend = s'arrête (plus facile à repartir)
          </div>
        </div>
      </SectionBlock>

      <SectionTitle>Points clés à retenir</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✓ Toujours serrer à droite lors d'un croisement</div>
          <div style={keyPoint}>✓ Obstacle de votre côté = vous cédez le passage</div>
          <div style={keyPoint}>✓ Gros véhicule laisse passer le petit (plus de 2m x 7m)</div>

          <div style={keyPoint}>✓ Pont étroit : regarder le sens de la flèche sur le panneau</div>
          <div style={keyPoint}>✓ En descente : celui qui descend s'arrête en premier</div>
          <div style={keyPoint}>✓ Camion vs autocar : toujours le camion qui recule</div>
          <div style={keyPoint}>✓ Véhicule déjà engagé : ne pas forcer même si prioritaire</div>
          <div style={keyPoint}>✓ Collisions frontales = 22% des tués, prudence maximale</div>
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
