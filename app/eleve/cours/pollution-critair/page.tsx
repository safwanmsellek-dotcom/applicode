'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

export default function PollutionCritairPage() {
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
          <div style={badge}>Fiche 86</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>Éco-conduite et Mobilité</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Pollution et vignette Crit'air</h1>
      </div>

      <SectionBlock>
        <p style={text}>La voiture pollue l'atmosphère, l'environnement et génère du bruit. Le transport routier est le <strong style={{ color: '#e84855' }}>1er secteur émetteur de CO2 en France</strong>.</p>
      </SectionBlock>

      <SectionTitle>Impact du transport routier</SectionTitle>

      <SectionBlock>
        <div style={{ background: '#1a2332', border: '2px solid #e84855', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#e84855', marginBottom: 8 }}>28%</div>
          <div style={{ fontSize: 16, color: '#d0d2e0', marginBottom: 16 }}>
            des émissions de CO2 en France viennent du transport routier
          </div>
          <div style={{ fontSize: 14, color: '#b8c5d6', borderTop: '1px solid #2a2f3d', paddingTop: 12 }}>
            Dont <strong style={{ color: '#e84855' }}>53% = voitures individuelles</strong>
          </div>
        </div>

        <Tip text="Moins de consommation = moins de pollution = plus d'argent dans votre poche !" />
      </SectionBlock>

      <SectionTitle>La vignette Crit'air</SectionTitle>

      <SectionBlock>
        <p style={text}>Le certificat qualité de l'air (Crit'air) classe les véhicules selon leur niveau de pollution. Il existe <strong style={{ color: '#e8ff47' }}>6 niveaux</strong> numérotés de 0 à 5.</p>

        <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 20, marginTop: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 50, height: 50, borderRadius: 10, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0 }}>0</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Véhicules électriques et hydrogène</div>
                <div style={{ fontSize: 13, color: '#6b7394' }}>Zéro émission - Le plus propre</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 50, height: 50, borderRadius: 10, background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0 }}>1</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Gaz, hybrides rechargeables</div>
                <div style={{ fontSize: 13, color: '#6b7394' }}>Essence depuis 2011</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 50, height: 50, borderRadius: 10, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0 }}>2</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Essence 2006-2010, Diesel depuis 2011</div>
                <div style={{ fontSize: 13, color: '#6b7394' }}>Pollution modérée</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 50, height: 50, borderRadius: 10, background: '#e84855', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0 }}>3</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Essence 1997-2005, Diesel 2006-2010</div>
                <div style={{ fontSize: 13, color: '#6b7394' }}>Pollution élevée</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 50, height: 50, borderRadius: 10, background: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0 }}>4</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Diesel 2001-2005</div>
                <div style={{ fontSize: 13, color: '#6b7394' }}>Très polluant</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 50, height: 50, borderRadius: 10, background: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0 }}>5</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Diesel 1997-2000</div>
                <div style={{ fontSize: 13, color: '#6b7394' }}>Extrêmement polluant</div>
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionTitle>Où la vignette est-elle obligatoire ?</SectionTitle>

      <SectionBlock>
        <p style={text}>La vignette Crit'air est obligatoire dans deux situations principales :</p>

        <SubTitle>1. Zones à Faibles Émissions (ZFE)</SubTitle>
        <p style={text}>Des zones permanentes où seuls certains véhicules peuvent circuler. Les ZFE se trouvent dans les grandes agglomérations :</p>

        <div style={keyPointsBox}>
          <div style={keyPoint}>🏙️ <strong>Paris et Métropole du Grand Paris</strong></div>
          <div style={keyPoint}>🏙️ <strong>Lyon</strong></div>
          <div style={keyPoint}>🏙️ <strong>Grenoble</strong></div>
          <div style={keyPoint}>🏙️ <strong>Toulouse, Montpellier, Strasbourg...</strong></div>
          <div style={{ fontSize: 13, color: '#6b7394', marginTop: 8 }}>
            Et d'autres métropoles en France
          </div>
        </div>

        <Warning text="Circuler sans vignette Crit'air dans une ZFE : amende de 68 euros (135 euros pour les poids lourds)." />

        <SubTitle>2. Circulation différenciée</SubTitle>
        <p style={text}>Lors des pics de pollution, les préfets peuvent instaurer la circulation différenciée. Seuls les véhicules peu polluants peuvent circuler.</p>

        <div style={{ background: '#2a1a1a', border: '1px solid #e84855', borderRadius: 12, padding: 18, marginTop: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#e84855', marginBottom: 8 }}>⚠️ Exemple de restriction</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: '#e6b8b8' }}>
            En cas de pic de pollution, seuls les Crit'air 0, 1, 2 peuvent circuler. Les Crit'air 3, 4, 5 sont interdits sous peine d'amende.
          </div>
        </div>
      </SectionBlock>

      <SectionTitle>Les avantages d'une vignette propre</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✅ <strong>Accès aux ZFE</strong> sans restriction</div>
          <div style={keyPoint}>✅ <strong>Circulation lors des pics de pollution</strong></div>
          <div style={keyPoint}>✅ <strong>Stationnement gratuit ou réduit</strong> dans certaines villes</div>
          <div style={keyPoint}>✅ <strong>Bonus écologique</strong> à l'achat (électrique/hybride)</div>
          <div style={keyPoint}>✅ <strong>Assurance moins chère</strong> (classe A/B)</div>
          <div style={keyPoint}>✅ <strong>Geste pour l'environnement</strong> et la santé publique</div>
        </div>

        <Tip text="Les véhicules Crit'air 0 (électriques) ne sont pas soumis au contrôle anti-pollution car ils ne rejettent aucun gaz." />
      </SectionBlock>

      <SectionTitle>Comment obtenir sa vignette ?</SectionTitle>

      <SectionBlock>
        <p style={text}>La démarche est simple et se fait en ligne sur le site officiel <strong style={{ color: '#e8ff47' }}>certificat-air.gouv.fr</strong></p>

        <div style={{ background: '#1a2332', border: '1px solid #4f6ef7', borderRadius: 12, padding: 20, marginTop: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📝 Démarche</div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: '#d0d2e0' }}>
            1. Rendez-vous sur <strong>certificat-air.gouv.fr</strong><br/>
            2. Renseignez votre plaque d'immatriculation<br/>
            3. Payez <strong>3,70 €</strong> (frais de fabrication et d'envoi)<br/>
            4. Recevez la vignette par courrier sous quelques jours
          </div>
        </div>

        <Warning text="Attention aux sites frauduleux ! Le seul site officiel est certificat-air.gouv.fr (prix : 3,70 €). Les autres sites sont des arnaques qui facturent beaucoup plus cher." />
      </SectionBlock>

      <SectionTitle>Points clés à retenir</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✓ Transport routier = 28% des émissions CO2 en France</div>
          <div style={keyPoint}>✓ Vignette Crit'air : 6 niveaux (0 = électrique, 5 = très polluant)</div>
          <div style={keyPoint}>✓ Obligatoire dans les ZFE et lors des pics de pollution</div>
          <div style={keyPoint}>✓ Prix officiel : 3,70 € sur certificat-air.gouv.fr</div>
          <div style={keyPoint}>✓ Amende si circulation sans vignette en ZFE : 68 euros</div>
          <div style={keyPoint}>✓ Classe 0 et 1 = avantages (stationnement, bonus écologique)</div>
          <div style={keyPoint}>✓ Véhicules électriques = zéro émission</div>
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
  background: '#10b981',
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
