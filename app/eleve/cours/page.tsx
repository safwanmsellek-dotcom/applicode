'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'

const THEMES = [
  {
    id: 'entree-sortie',
    icon: '🚗',
    color: '#4f6ef7',
    titre: 'Prendre et quitter son véhicule',
    resume: "Comment inspecter, entrer, sortir et vous installer dans votre véhicule.",
    fiches: [
      { id: 'verifications', numero: 1, titre: "Les vérifications du véhicule avant chaque départ" },
      { id: 'entree-sortie-vehicule', numero: 2, titre: "Entrer et sortir du véhicule" },
      { id: 'installation-poste', numero: 3, titre: "Installation au poste de conduite" },
    ]
  },
  {
    id: 'conducteur',
    icon: '👤',
    color: '#10b981',
    titre: 'Le Conducteur',
    resume: "État du conducteur, vigilance, fatigue, angles morts et anticipation pour une conduite sûre.",
    fiches: [
      { id: 'conducteur', numero: 24, titre: "L'état du conducteur" },
    ]
  },
  {
    id: 'mecanique',
    icon: '⚙️',
    color: '#f59e0b',
    titre: 'Éléments mécaniques',
    resume: "Tableau de bord, voyants, démarrage moteur et systèmes d'éclairage du véhicule.",
    fiches: [
      { id: 'elements-mecaniques', numero: 25, titre: "Éléments mécaniques du véhicule" },
    ]
  },
  {
    id: 'equipements',
    icon: '🛡️',
    color: '#8b5cf6',
    titre: 'Équipements de sécurité',
    resume: "Sécurité active, passive et aides à la conduite pour une protection optimale.",
    fiches: [
      { id: 'securite-active', numero: 26, titre: "Sécurité active vs passive" },
      { id: 'securite-passive', numero: 27, titre: "Direction, pneumatiques, suspensions, freins" },
      { id: 'abs-afu-esp', numero: 28, titre: "ABS, AFU, ESP" },
      { id: 'regulateur-limiteur', numero: 29, titre: "Régulateur et limiteur de vitesse" },
      { id: 'aides-conduite', numero: 30, titre: "Nouvelles aides à la conduite" },
      { id: 'ceinture-airbags', numero: 31, titre: "Ceinture, airbags, appui-tête" },
      { id: 'installation-adultes', numero: 32, titre: "Installation des adultes" },
      { id: 'installation-enfants', numero: 33, titre: "Installation des enfants" },
      { id: 'installation-animaux', numero: 34, titre: "Installation des animaux" },
    ]
  },
  {
    id: 'intersections',
    icon: '🚦',
    color: '#ec4899',
    titre: 'Les Intersections',
    resume: "Feux tricolores, priorités, ronds-points et tournants pour naviguer en toute sécurité.",
    fiches: [
      { id: 'feux-tricolores', numero: 35, titre: "Les feux tricolores" },
      { id: 'feux-fleches', numero: 36, titre: "Feux en forme de flèche" },
      { id: 'feux-clignotants', numero: 37, titre: "Feux clignotants et en panne" },
      { id: 'agents-circulation', numero: 38, titre: "Agent de circulation" },
      { id: 'feux-specifiques', numero: 39, titre: "Feux spécifiques (bus, vélos, tramways)" },
      { id: 'priorite-droite', numero: 40, titre: "Priorité à droite" },
      { id: 'cedez-passage', numero: 41, titre: "Cédez le passage" },
      { id: 'stop-panneau', numero: 42, titre: "Le STOP" },
      { id: 'route-prioritaire', numero: 43, titre: "Route prioritaire" },
      { id: 'cas-particuliers', numero: 44, titre: "Cas particuliers (chemins, sorties privées)" },
      { id: 'allure-analyse', numero: 45, titre: "Allure, analyse et décision" },
      { id: 'giratoires-ronds-points', numero: 46, titre: "Carrefours à sens giratoire vs ronds-points" },
      { id: 'placement-giratoire', numero: 47, titre: "Placement et circulation dans un rond-point" },
      { id: 'sortie-giratoire', numero: 48, titre: "Sortir d'un rond-point" },
      { id: 'tourner-droite', numero: 49, titre: "Tourner à droite" },
      { id: 'tourner-gauche', numero: 50, titre: "Tourner à gauche" },
    ]
  },
  {
    id: 'reglementation',
    icon: '📋',
    color: '#06b6d4',
    titre: 'Réglementation et Accidents',
    resume: "Permis, points, sanctions, assurance et conduite à tenir en cas d'accident.",
    fiches: [
      { id: 'permis-conduire', numero: 51, titre: "Le permis de conduire (catégories)" },
      { id: 'permis-probatoire', numero: 52, titre: "Le permis probatoire" },
      { id: 'stages-postpermis', numero: 53, titre: "Stages postpermis" },
      { id: 'permis-points', numero: 54, titre: "Le permis à points" },
      { id: 'sanctions-contraventions', numero: 55, titre: "Sanctions (contraventions et délits)" },
      { id: 'recuperation-points', numero: 56, titre: "Récupération de points" },
      { id: 'sanctions-vitesse', numero: 57, titre: "Tableau des sanctions vitesse" },
      { id: 'vitesse-radars', numero: 58, titre: "Vitesse excessive et radars" },
      { id: 'telephone-volant', numero: 59, titre: "Le téléphone au volant" },
      { id: 'documents-obligatoires', numero: 60, titre: "Documents obligatoires" },
      { id: 'assurance-automobile', numero: 61, titre: "L'assurance automobile" },
      { id: 'accident-proteger', numero: 62, titre: "Accident corporel : Protéger" },
      { id: 'accident-alerter', numero: 63, titre: "Alerter les secours" },
      { id: 'accident-secourir', numero: 64, titre: "Secourir les victimes" },
      { id: 'accident-materiel', numero: 65, titre: "Accident matériel et constat amiable" },
    ]
  },
  {
    id: 'signalisation',
    icon: '🚸',
    color: '#f43f5e',
    titre: 'La Signalisation',
    resume: "Panneaux, marquages au sol, signalisation temporaire et règles de vitesse.",
    fiches: [
      { id: 'formes-couleurs-panneaux', numero: 66, titre: "Formes et couleurs des panneaux" },
      { id: 'panneaux-danger', numero: 67, titre: "Panneaux de danger" },
      { id: 'panneaux-interdiction', numero: 68, titre: "Panneaux d'interdiction" },
      { id: 'panneaux-obligation', numero: 69, titre: "Panneaux d'obligation" },
      { id: 'panneaux-indication', numero: 70, titre: "Panneaux d'indication et de localisation" },
      { id: 'panneaux-direction', numero: 71, titre: "Panneaux de direction" },
      { id: 'balises-bornes', numero: 72, titre: "Balises et bornes" },
      { id: 'marquage-sol', numero: 73, titre: "Signalisation horizontale (marquage au sol)" },
      { id: 'lignes-sol', numero: 74, titre: "Lignes au sol" },
      { id: 'voies-speciales', numero: 75, titre: "Voies spéciales et marquages" },
      { id: 'signalisation-temporaire', numero: 76, titre: "Signalisation temporaire" },
      { id: 'feux-signalisation', numero: 77, titre: "Feux tricolores" },
      { id: 'panneaux-zone', numero: 78, titre: "Panneaux de zone" },
      { id: 'passages-niveau', numero: 79, titre: "Passages à niveau" },
      { id: 'vitesse-reglementation', numero: 80, titre: "Réglementation de la vitesse" },
    ]
  },
  {
    id: 'route-usagers',
    icon: '🛣️',
    color: '#e84855',
    titre: 'La Route + Les Autres Usagers',
    resume: "Maîtrisez les différents types de routes, conditions météo et comportements à adopter avec les autres usagers.",
    fiches: [
      { id: 'types-routes', numero: 1, titre: "Les types de routes" },
      { id: 'entree-autoroute', numero: 2, titre: "Entrée sur l'autoroute" },
      { id: 'circuler-autoroute', numero: 3, titre: "Circuler sur l'autoroute" },
      { id: 'sortir-autoroute', numero: 4, titre: "Sortir de l'autoroute" },
      { id: 'circulation-dense', numero: 5, titre: "Circulation dense" },
      { id: 'circuler-nuit', numero: 6, titre: "Circuler de nuit" },
      { id: 'vent-fort', numero: 7, titre: "Vent fort" },
      { id: 'temps-pluie', numero: 8, titre: "Temps de pluie" },
      { id: 'brouillard', numero: 9, titre: "Brouillard" },
      { id: 'neige-verglas', numero: 10, titre: "Neige et verglas" },
      { id: 'zones-danger', numero: 11, titre: "Zones de danger" },
      { id: 'virages-dangereux', numero: 12, titre: "Virages dangereux" },
      { id: 'pentes-dangereuses', numero: 13, titre: "Pentes dangereuses" },
      { id: 'passages-niveau', numero: 14, titre: "Passages à niveau" },
      { id: 'tunnels', numero: 15, titre: "Les tunnels" },
      { id: 'utilisation-feux', numero: 16, titre: "Utilisation des feux" },
      { id: 'pietons', numero: 17, titre: "Les piétons" },
      { id: 'cyclistes', numero: 18, titre: "Les cyclistes" },
      { id: 'deux-roues-motorises', numero: 19, titre: "Les deux-roues motorisés" },
      { id: 'bus-poids-lourds', numero: 20, titre: "Bus et poids lourds" },
      { id: 'tramways-vehicules-prioritaires', numero: 21, titre: "Tramways et véhicules prioritaires" },
      { id: 'code-rue', numero: 22, titre: "Le code de la rue" },
      { id: 'circulation-inter-files', numero: 23, titre: "Circulation inter-files" },
    ]
  },
  {
    id: 'circulation',
    icon: '↔️',
    color: '#4f6ef7',
    titre: 'Règles de Circulation',
    resume: "Placement, croisements, dépassements, arrêt et stationnement - tout pour circuler en sécurité.",
    fiches: [
      { id: 'choix-voies-placement', numero: 81, titre: "Choix des voies et placement" },
      { id: 'croisements', numero: 82, titre: "Les croisements" },
      { id: 'depassements', numero: 83, titre: "Les dépassements" },
      { id: 'arret-stationnement', numero: 84, titre: "Arrêt et stationnement" },
      { id: 'distances-securite', numero: 85, titre: "Distances de sécurité et freinage" },
    ]
  },
  {
    id: 'ecoconduite',
    icon: '🌱',
    color: '#10b981',
    titre: 'Éco-conduite et Mobilité',
    resume: "Réduire la pollution, économiser du carburant et adopter une mobilité durable.",
    fiches: [
      { id: 'pollution-critair', numero: 86, titre: "Pollution et vignette Crit'air" },
      { id: 'choix-vehicule-energies', numero: 87, titre: "Choix du véhicule et énergies alternatives" },
      { id: 'entretien-vehicule', numero: 88, titre: "Entretien et recyclage" },
      { id: 'vitesse-consommation', numero: 89, titre: "Vitesse et consommation" },
      { id: 'ecomobilite', numero: 90, titre: "L'écomobilité" },
    ]
  },
]

export default function CoursPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [openTheme, setOpenTheme] = useState<string | null>(null)

  useEffect(() => {
    if (!user) router.push('/login')
    if (user?.role === 'admin') router.push('/admin')
  }, [user])

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px', fontFamily: 'sans-serif', color: '#f0f2f8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1 style={{ color: '#e8ff47', fontSize: 24, marginBottom: 4 }}>📖 Cours du code</h1>
          <p style={{ color: '#6b7394', fontSize: 14 }}>Choisissez un thème puis une fiche pour commencer</p>
        </div>
        <button onClick={() => router.push('/eleve')} style={{ background: '#1e2230', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 8, padding: '9px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>← Accueil</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {THEMES.map(theme => {
          const isOpen = openTheme === theme.id
          return (
            <div key={theme.id} style={{ background: '#161920', border: `1px solid ${isOpen ? theme.color + '66' : '#2a2f3d'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color .3s' }}>
              <button
                onClick={() => setOpenTheme(isOpen ? null : theme.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '20px', background: 'transparent', border: 'none', color: '#f0f2f8', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 12, background: theme.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{theme.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{theme.titre}</div>
                  <div style={{ fontSize: 13, color: '#6b7394' }}>{theme.resume}</div>
                  <div style={{ fontSize: 11, color: theme.color, marginTop: 4 }}>{theme.fiches.length} fiches</div>
                </div>
                <div style={{ fontSize: 18, color: '#6b7394', transition: 'transform .3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>▼</div>
              </button>

              {isOpen && (
                <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {theme.fiches.map(fiche => (
                    <button
                      key={fiche.id}
                      onClick={() => router.push(`/eleve/cours/${fiche.id}`)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                        padding: '16px 18px', background: '#0d0f14',
                        border: '1px solid #2a2f3d', borderRadius: 12,
                        color: '#f0f2f8', cursor: 'pointer', textAlign: 'left',
                        transition: 'border-color .2s',
                      }}
                      onMouseOver={e => (e.currentTarget.style.borderColor = theme.color)}
                      onMouseOut={e => (e.currentTarget.style.borderColor = '#2a2f3d')}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: theme.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: theme.color, flexShrink: 0 }}>{fiche.numero}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{fiche.titre}</div>
                      </div>
                      <div style={{ color: '#6b7394', fontSize: 16 }}>→</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12 }}>
        <p style={{ color: '#6b7394', fontSize: 13 }}>📚 D'autres cours seront ajoutés prochainement !</p>
      </div>
    </div>
  )
}
