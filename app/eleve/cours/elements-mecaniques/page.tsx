'use client'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'
import { SchemaTableauBord, SchemaVoyantsRouges, SchemaVoyantsOrange, SchemaPositionsCle, SchemaTypesFeux } from '../schemas'

export default function ElementsMecaniquesPage() {
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
          <div style={badge}>Fiche 25</div>
          <div style={{ fontSize: 11, color: '#6b7394' }}>Éléments mécaniques</div>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3 }}>Éléments mécaniques du véhicule</h1>
      </div>

      {/* PARTIE 1 : LE TABLEAU DE BORD */}
      <SectionTitle>Le tableau de bord</SectionTitle>

      <SectionBlock>
        <p style={text}>Le tableau de bord est composé de nombreux <strong style={{ color: '#e8ff47' }}>voyants et cadrans</strong> donnant des informations nécessaires à la conduite.</p>

        <SchemaTableauBord />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Les 4 compteurs essentiels</SubTitle>
        
        <TableBlock color="#f59e0b" rows={[
          ['Compteur', 'Fonction', 'Information importante'],
          ['Compte-tours', 'Tours moteur/minute', 'Aide à l\'éco-conduite (régimes bas = économie)'],
          ['Compteur vitesse', 'Vitesse en km/h', 'OBLIGATOIRE - Infraction si en panne'],
          ['Jauge essence', 'Niveau carburant', 'Réserve ~50 km quand voyant s\'allume'],
          ['Température', 'Liquide refroidissement', 'Normal à 90°C - ARRÊT si dépasse'],
        ]} />

        <Warning text="Si la température dépasse 90°C et continue de monter, ARRÊTEZ-VOUS immédiatement ! Risque de casse moteur." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Les commandes au volant (commodos)</SubTitle>
        
        <div style={keyPointsBox}>
          <div style={keyPoint}>⬅️ <strong>Gauche :</strong> Clignotants (bas=gauche / haut=droite)</div>
          <div style={keyPoint}>➡️ <strong>Droite :</strong> Essuie-glaces (haut=vitesse variable)</div>
        </div>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Le bloc ventilation</SubTitle>
        <p style={text}>Permet de réchauffer/refroidir l'habitacle et de dégivrer/désembuer les vitres :</p>
        
        <div style={keyPointsBox}>
          <div style={keyPoint}>🌡️ Température : Bleu=froid / Rouge=chaud</div>
          <div style={keyPoint}>💨 Intensité de ventilation réglable</div>
          <div style={keyPoint}>❄️ Climatisation</div>
          <div style={keyPoint}>🪟 Dégivrage/désembuage vitre arrière</div>
        </div>
      </SectionBlock>

      {/* PARTIE 2 : LES VOYANTS */}
      <SectionTitle>Les voyants</SectionTitle>

      <SectionBlock>
        <p style={text}>Les voyants sont de <strong style={{ color: '#e8ff47' }}>3 couleurs</strong> selon la gravité :</p>

        <TableBlock color="#e84855" rows={[
          ['Couleur', 'Signification'],
          ['🔴 ROUGE', 'Danger IMMÉDIAT - Arrêt obligatoire'],
          ['🟠 ORANGE', 'Danger potentiel - Surveiller'],
          ['🟢 VERT/BLEU', 'Information - Équipement allumé'],
        ]} />

        <Warning text="Dès qu'un voyant ROUGE s'allume : ARRÊT IMMÉDIAT ! Risque d'endommagement grave du moteur ou d'accident." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Voyants ROUGES - Danger immédiat</SubTitle>
        
        <SchemaVoyantsRouges />

        <div style={{ marginTop: 16, ...keyPointsBox }}>
          <div style={keyPoint}>🛢️ <strong>Huile :</strong> Moteur pas assez graissé → Ajouter huile</div>
          <div style={keyPoint}>🌡️ <strong>Température :</strong> Surchauffe moteur → Liquide refroidissement</div>
          <div style={keyPoint}>🛑 <strong>Freins :</strong> Baisse pression/niveau → Capacités freinage affectées</div>
          <div style={keyPoint}>🔋 <strong>Batterie :</strong> À plat ou cosse desserrée → Recharger</div>
          <div style={keyPoint}>🔒 <strong>Ceinture :</strong> Passager non attaché → Vérifier tous</div>
          <div style={keyPoint}>💺 <strong>Airbag :</strong> Désactivé si enfant dos à la route avant</div>
        </div>

        <Tip text="Pinces batterie : Brancher TOUJOURS d'abord les bornes + (rouges) puis les - (noires)." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Voyants ORANGE - À surveiller</SubTitle>
        
        <SchemaVoyantsOrange />

        <div style={{ marginTop: 16, ...keyPointsBox }}>
          <div style={keyPoint}>🔧 <strong>Plaquettes :</strong> Usées → À changer</div>
          <div style={keyPoint}>⛽ <strong>Carburant :</strong> Réserve ~50 km → Faire le plein rapidement</div>
          <div style={keyPoint}>🔥 <strong>Préchauffage :</strong> Diesel uniquement → Attendre extinction avant démarrer</div>
          <div style={keyPoint}>🛞 <strong>Pression pneus :</strong> Défaut → Regonfler</div>
          <div style={keyPoint}>⚙️ <strong>ABS :</strong> Système désactivé ou problème</div>
          <div style={keyPoint}>🔴 <strong>Moteur :</strong> Avarie → Garage le plus tôt possible</div>
        </div>

        <Warning text="Rouler sur la réserve (carburant bas) n'est pas bon pour le moteur qui avale les particules du fond du réservoir." />
      </SectionBlock>

      {/* PARTIE 3 : DÉMARRAGE MOTEUR */}
      <SectionTitle>Le démarrage du moteur</SectionTitle>

      <SectionBlock>
        <p style={text}>Il y a <strong style={{ color: '#e8ff47' }}>4 positions</strong> dans le contacteur-démarreur :</p>

        <SchemaPositionsCle />

        <div style={{ marginTop: 16, ...keyPointsBox }}>
          <div style={keyPoint}>I - Insertion de la clé</div>
          <div style={keyPoint}>II - Déverrouillage antivol (tourner clé + volant)</div>
          <div style={keyPoint}>III - Contact électrique (accessoires ON, voyants allumés)</div>
          <div style={keyPoint}>IV - Démarrage moteur (relâcher dès que moteur démarre)</div>
        </div>

        <Warning text="Ne JAMAIS maintenir la clé en position IV après démarrage ! Risque d'abîmer le moteur." />

        <Tip text="Sur véhicules récents : clés-cartes ou bouton Start/Stop. Antivol se met en place en tournant le volant jusqu'au blocage après retrait clé." />
      </SectionBlock>

      {/* PARTIE 4 : SYSTÈMES D'ÉCLAIRAGE */}
      <SectionTitle>Les systèmes d'éclairage</SectionTitle>

      <SectionBlock>
        <p style={text}>Les feux permettent à la fois de <strong style={{ color: '#e8ff47' }}>voir et d'être vu</strong>. Il existe 6 types de feux principaux :</p>

        <SchemaTypesFeux />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Feux de croisement</SubTitle>
        <p style={text}>• Éclairent à <strong style={{ color: '#f0f2f8' }}>30 mètres</strong><br/>
        • Obligatoires <strong style={{ color: '#e8ff47' }}>dès la tombée de la nuit</strong><br/>
        • Molette sur tableau de bord pour régler la hauteur (véhicule chargé)</p>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Feux de route</SubTitle>
        <p style={text}>• Éclairent à <strong style={{ color: '#f0f2f8' }}>100 mètres minimum</strong><br/>
        • OBLIGATOIRES sur chaussées non éclairées (agglo et hors agglo)</p>

        <Warning text="Les feux de route ne sont PAS interdits en agglomération ! Ils sont même obligatoires si pas d'éclairage public." />

        <div style={{ marginTop: 12, ...keyPointsBox }}>
          <div style={{ color: '#e84855', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Repasser en croisement si :</div>
          <div style={keyPoint}>• Croisement véhicule en sens inverse</div>
          <div style={keyPoint}>• Pluie, neige ou brouillard (reflet aveuglant)</div>
          <div style={keyPoint}>• Suivi véhicule à faible distance</div>
          <div style={keyPoint}>• Arrêt ou stationnement</div>
        </div>
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Feux de brouillard</SubTitle>
        
        <p style={text}><strong style={{ color: '#f0f2f8' }}>Avant :</strong> Éclairent bas, près du véhicule</p>
        <div style={keyPointsBox}>
          <div style={keyPoint}>• Brouillard/neige/forte pluie : PEUVENT remplacer ou compléter croisement</div>
          <div style={keyPoint}>• Route étroite et sinueuse hors agglo : PEUVENT compléter feux de route</div>
        </div>

        <p style={text}><strong style={{ color: '#f0f2f8' }}>Arrière :</strong> Lumière rouge intense</p>
        <div style={keyPointsBox}>
          <div style={keyPoint}>• Uniquement brouillard OU neige</div>
          <div style={keyPoint}>• Si 1 seul feu : côté gauche</div>
        </div>

        <Warning text="Feux brouillard arrière par temps de pluie = INTERDIT ! Amende 135€. Très puissants, ils éblouissent le conducteur derrière vous." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Feux diurnes (feux de jour)</SubTitle>
        <p style={text}>• Obligatoires sur véhicules neufs depuis 2011<br/>
        • Couleur blanche uniquement<br/>
        • S'allument automatiquement le jour<br/>
        • S'éteignent si croisement/route allumés<br/>
        • Consomment très peu (souvent LEDs)</p>

        <Warning text="Les feux diurnes ne suffisent PAS par brouillard, neige ou faible luminosité. Utilisez croisement ou position." />
      </SectionBlock>

      <SectionBlock>
        <SubTitle>Types d'ampoules</SubTitle>
        
        <TableBlock color="#4f6ef7" rows={[
          ['Type', 'Durée de vie', 'Caractéristiques'],
          ['Halogènes', '200-600h', 'Anciennes - Forte consommation - Faible éclairage'],
          ['Xénon', '1000-2000h', 'Lumière bleutée - Bon éclairage'],
          ['LED', 'Plusieurs milliers h', 'Très économes - Excellent éclairage - Faible résistance chaleur'],
          ['Laser', 'Très longue', 'Nouvelle génération - Portée énorme - Très chers'],
        ]} />
      </SectionBlock>

      {/* POINTS CLÉS */}
      <SectionTitle>Points clés à retenir</SectionTitle>

      <SectionBlock>
        <div style={keyPointsBox}>
          <div style={keyPoint}>✓ Température moteur normale : 90°C</div>
          <div style={keyPoint}>✓ Réserve essence : ~50 km après voyant</div>
          <div style={keyPoint}>✓ Voyant rouge = ARRÊT IMMÉDIAT</div>
          <div style={keyPoint}>✓ Ne jamais maintenir clé en position IV</div>
          <div style={keyPoint}>✓ Feux route : 100m minimum</div>
          <div style={keyPoint}>✓ Feux croisement : 30m</div>
          <div style={keyPoint}>✓ Feux route autorisés en agglomération (si pas éclairage)</div>
          <div style={keyPoint}>✓ Brouillard AR interdit par pluie (135€)</div>
          <div style={keyPoint}>✓ Feux diurnes obligatoires depuis 2011</div>
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
  background: '#f59e0b',
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
