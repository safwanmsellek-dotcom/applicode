// Composants de schémas pour les cours
// Ces schémas sont basés sur le PDF du cours

export const SchemaRoute2Voies = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 12, textAlign: 'center' }}>
      Ligne discontinue = dépassement autorisé
    </div>
    <svg viewBox="0 0 600 100" style={{ width: '100%', height: 'auto' }}>
      {/* Route bleue foncée */}
      <rect x="50" y="20" width="500" height="60" fill="#001e3c" />
      
      {/* Ligne discontinue centrale */}
      <line x1="50" y1="50" x2="120" y2="50" stroke="#fff" strokeWidth="3" strokeDasharray="5,10" />
      <line x1="140" y1="50" x2="210" y2="50" stroke="#fff" strokeWidth="3" strokeDasharray="5,10" />
      <line x1="230" y1="50" x2="300" y2="50" stroke="#fff" strokeWidth="3" strokeDasharray="5,10" />
      <line x1="320" y1="50" x2="390" y2="50" stroke="#fff" strokeWidth="3" strokeDasharray="5,10" />
      <line x1="410" y1="50" x2="480" y2="50" stroke="#fff" strokeWidth="3" strokeDasharray="5,10" />
      <line x1="500" y1="50" x2="550" y2="50" stroke="#fff" strokeWidth="3" strokeDasharray="5,10" />
      
      {/* Voiture bleue (haut, va vers la droite) */}
      <rect x="180" y="27" width="40" height="18" rx="3" fill="#4a90e2" />
      <circle cx="188" cy="46" r="3" fill="#2d3748" />
      <circle cx="212" cy="46" r="3" fill="#2d3748" />
      <polygon points="220,32 230,35 230,40 220,37" fill="#87ceeb" opacity="0.7" />
      
      {/* Voiture rouge (bas, va vers la gauche) */}
      <rect x="380" y="55" width="40" height="18" rx="3" fill="#e84855" />
      <circle cx="388" cy="54" r="3" fill="#2d3748" />
      <circle cx="412" cy="54" r="3" fill="#2d3748" />
      <polygon points="380,62 370,65 370,70 380,67" fill="#ffb3ba" opacity="0.7" />
    </svg>
    <div style={{ fontSize: 12, color: '#6b7394', marginTop: 8, textAlign: 'center', fontStyle: 'italic' }}>
      Ligne discontinue = dépassement autorisé
    </div>
  </div>
)

export const SchemaLimitationsVitesse = () => (
  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
    {[
      { vitesse: '80', desc: '2 voies\ndouble sens', color: '#4f6ef7' },
      { vitesse: '90', desc: '3-4 voies\n2 même sens', color: '#4f6ef7' },
      { vitesse: '110', desc: 'Terre-plein\ncentral', color: '#4f6ef7' },
      { vitesse: '100', desc: 'Terre-plein +\npluie/probat.', color: '#e84855' }
    ].map((item, i) => (
      <div key={i} style={{ background: '#f5f7fa', border: `2px solid ${item.color}22`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: item.color, marginBottom: 4 }}>{item.vitesse}</div>
        <div style={{ fontSize: 11, color: '#6b7394', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{item.desc}</div>
      </div>
    ))}
  </div>
)

export const SchemaChancesSurvie = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>
      Chances de survie d'un piéton selon la vitesse
    </div>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 200, paddingBottom: 20 }}>
      {[
        { vitesse: '30 km/h', pourcent: '90%', hauteur: 180, color: '#10b981' },
        { vitesse: '50 km/h', pourcent: '20%', hauteur: 40, color: '#f59e0b' },
        { vitesse: '70 km/h', pourcent: '0,5%', hauteur: 10, color: '#e84855' }
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: 120 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.pourcent}</div>
          <div style={{ 
            width: '80%', 
            height: item.hauteur, 
            background: item.color, 
            borderRadius: '8px 8px 0 0',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
          <div style={{ fontSize: 12, fontWeight: 600, color: '#2d3748', marginTop: 8 }}>{item.vitesse}</div>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 11, color: '#6b7394', marginTop: 12, textAlign: 'center', fontStyle: 'italic' }}>
      À 30 km/h : 90% de survie. À 50 km/h : 20%. À 70 km/h : 0,5%
    </div>
  </div>
)

export const SchemaDistancesPietonsCyclistes = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>
      1 m en ville / 1,50 m hors agglomération
    </div>
    <svg viewBox="0 0 600 100" style={{ width: '100%', height: 'auto' }}>
      {/* Route */}
      <rect x="50" y="30" width="500" height="40" fill="#001e3c" />
      <line x1="50" y1="50" x2="550" y2="50" stroke="#fff" strokeWidth="2" strokeDasharray="5,10" />
      
      {/* Voiture */}
      <rect x="180" y="35" width="45" height="20" rx="3" fill="#4a90e2" />
      <circle cx="190" cy="56" r="3" fill="#2d3748" />
      <circle cx="215" cy="56" r="3" fill="#2d3748" />
      
      {/* Cycliste */}
      <circle cx="450" cy="47" r="6" fill="#10b981" />
      <line x1="450" y1="53" x2="450" y2="65" stroke="#10b981" strokeWidth="3" />
      <line x1="450" y1="58" x2="445" y2="65" stroke="#10b981" strokeWidth="2" />
      <line x1="450" y1="58" x2="455" y2="65" stroke="#10b981" strokeWidth="2" />
      <circle cx="450" cy="42" r="3" fill="#2d3748" />
      
      {/* Flèches de distance */}
      <line x1="230" y1="20" x2="440" y2="20" stroke="#e84855" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
      <text x="335" y="17" fill="#e84855" fontSize="12" fontWeight="600" textAnchor="middle">1 m - 1,50 m</text>
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#e84855" />
        </marker>
      </defs>
    </svg>
    <div style={{ fontSize: 11, color: '#6b7394', marginTop: 12, textAlign: 'center', fontStyle: 'italic' }}>
      Prenez le plus de marge possible
    </div>
  </div>
)

export const SchemaVoieInsertion = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>
      Bretelle puis voie d'insertion
    </div>
    <svg viewBox="0 0 600 200" style={{ width: '100%', height: 'auto' }}>
      {/* Autoroute principale */}
      <rect x="50" y="80" width="500" height="80" fill="#001e3c" />
      <line x1="50" y1="120" x2="550" y2="120" stroke="#fff" strokeWidth="3" />
      
      {/* Bretelle d'accès (courbe) */}
      <path d="M 100 30 Q 120 50, 150 70 L 200 90" 
            stroke="#003d66" 
            strokeWidth="30" 
            fill="none" 
            strokeLinecap="round" />
      
      {/* Voie d'insertion (pointillés) */}
      <line x1="200" y1="90" x2="400" y2="90" stroke="#fff" strokeWidth="3" strokeDasharray="10,5" />
      <line x1="200" y1="105" x2="400" y2="105" stroke="#fff" strokeWidth="2" />
      
      {/* Voiture sur bretelle */}
      <rect x="130" y="48" width="30" height="15" rx="2" fill="#e84855" transform="rotate(-20 145 55)" />
      
      {/* Voiture sur autoroute */}
      <rect x="450" y="125" width="35" height="18" rx="3" fill="#4a90e2" />
      
      {/* Labels */}
      <text x="140" y="25" fill="#2d3748" fontSize="11" fontWeight="600">Bretelle</text>
      <text x="270" y="85" fill="#2d3748" fontSize="11" fontWeight="600">Voie d'insertion</text>
      <text x="420" y="75" fill="#2d3748" fontSize="11" fontWeight="600">Autoroute</text>
      
      {/* Flèche indication */}
      <path d="M 380 95 L 400 95" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />
      
      <defs>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#10b981" />
        </marker>
      </defs>
    </svg>
    <div style={{ fontSize: 11, color: '#e84855', marginTop: 12, textAlign: 'center', fontWeight: 600 }}>
      ⚠️ Cédez le passage - Vous n'êtes PAS prioritaire
    </div>
  </div>
)

export const SchemaCirculationNuit = () => (
  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 10 }}>
    {[
      { nom: 'Position', portee: '150m', usage: 'Être vu', icon: '💡' },
      { nom: 'Croisement', portee: '30m', usage: 'Sans éblouir', icon: '🔦' },
      { nom: 'Route', portee: '100m', usage: 'Voir loin', icon: '💫' },
      { nom: 'Br. AV', portee: '--', usage: 'Brouillard', icon: '🌫️' },
      { nom: 'Br. AR', portee: '--', usage: 'Brouillard', icon: '🔴' }
    ].map((feu, i) => (
      <div key={i} style={{ background: i < 3 ? '#1a3a1a' : '#3a3a1a', border: i < 3 ? '1px solid #2d5a2d' : '1px solid #5a4d2d', borderRadius: 10, padding: 12, textAlign: 'center' }}>
        <div style={{ fontSize: 24, marginBottom: 4 }}>{feu.icon}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f2f8', marginBottom: 2 }}>{feu.nom}</div>
        <div style={{ fontSize: 11, color: '#b8e6b8' }}>{feu.portee}</div>
        <div style={{ fontSize: 10, color: '#6b7394', marginTop: 4 }}>{feu.usage}</div>
      </div>
    ))}
  </div>
)

// Schémas pour le cours Conducteur

export const SchemaChampVisuel = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>
      Champ visuel du conducteur
    </div>
    <svg viewBox="0 0 600 300" style={{ width: '100%', height: 'auto' }}>
      {/* Personnage conducteur */}
      <circle cx="300" cy="150" r="25" fill="#2d3748" />
      <circle cx="290" cy="145" r="3" fill="#fff" />
      <circle cx="310" cy="145" r="3" fill="#fff" />
      
      {/* Champ visuel (triangle) */}
      <path d="M 300 150 L 100 50 L 100 250 Z" fill="#10b981" opacity="0.2" />
      <path d="M 300 150 L 500 50 L 500 250 Z" fill="#10b981" opacity="0.2" />
      
      {/* Lignes de vision */}
      <line x1="300" y1="150" x2="100" y2="50" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="300" y1="150" x2="100" y2="250" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="300" y1="150" x2="500" y2="50" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="300" y1="150" x2="500" y2="250" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
      <line x1="300" y1="150" x2="550" y2="150" stroke="#10b981" strokeWidth="3" />
      
      {/* Labels */}
      <text x="450" y="150" fill="#10b981" fontSize="14" fontWeight="600">→ Vision</text>
      <text x="150" y="100" fill="#6b7394" fontSize="12">180°</text>
    </svg>
    <div style={{ fontSize: 11, color: '#6b7394', marginTop: 12, textAlign: 'center', fontStyle: 'italic' }}>
      Adulte : 180° / Enfant : 70°
    </div>
  </div>
)

export const SchemaAnglesMorts = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>
      Zones d'angles morts (en rouge)
    </div>
    <svg viewBox="0 0 600 400" style={{ width: '100%', height: 'auto' }}>
      {/* Voiture vue de dessus */}
      <rect x="240" y="150" width="120" height="200" fill="#4a90e2" rx="8" />
      
      {/* Zones visibles (vert) */}
      <path d="M 300 150 L 150 50 L 450 50 Z" fill="#10b981" opacity="0.3" />
      <path d="M 240 200 L 100 150 L 100 300 L 240 250 Z" fill="#10b981" opacity="0.3" />
      <path d="M 360 200 L 500 150 L 500 300 L 360 250 Z" fill="#10b981" opacity="0.3" />
      
      {/* Zones angles morts (rouge) */}
      <path d="M 240 200 L 150 180 L 150 220 Z" fill="#e84855" opacity="0.5" />
      <path d="M 360 200 L 450 180 L 450 220 Z" fill="#e84855" opacity="0.5" />
      <path d="M 240 300 L 150 280 L 150 320 Z" fill="#e84855" opacity="0.5" />
      <path d="M 360 300 L 450 280 L 450 320 Z" fill="#e84855" opacity="0.5" />
      
      {/* Rétroviseurs */}
      <rect x="230" y="165" width="10" height="6" fill="#2d3748" />
      <rect x="360" y="165" width="10" height="6" fill="#2d3748" />
      <rect x="285" y="155" width="30" height="5" fill="#2d3748" />
      
      {/* Labels */}
      <text x="180" y="200" fill="#e84855" fontSize="11" fontWeight="600">Angle mort</text>
      <text x="380" y="200" fill="#e84855" fontSize="11" fontWeight="600">Angle mort</text>
      <text x="300" y="100" fill="#10b981" fontSize="11" textAnchor="middle">Vision avant</text>
    </svg>
    <div style={{ fontSize: 11, color: '#e84855', marginTop: 12, textAlign: 'center', fontWeight: 600 }}>
      ⚠️ Toujours tourner la tête pour vérifier les angles morts
    </div>
  </div>
)

export const SchemaTempsReaction = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>
      Temps de réaction (environ 1 seconde)
    </div>
    <svg viewBox="0 0 700 150" style={{ width: '100%', height: 'auto' }}>
      {/* Timeline */}
      <line x1="50" y1="75" x2="650" y2="75" stroke="#d0d5dd" strokeWidth="3" />
      
      {/* Étape 1: Perception */}
      <circle cx="120" cy="75" r="35" fill="#4f6ef7" opacity="0.2" />
      <text x="120" y="70" fill="#4f6ef7" fontSize="24" textAnchor="middle">👁️</text>
      <text x="120" y="120" fill="#2d3748" fontSize="12" textAnchor="middle" fontWeight="600">Perception</text>
      <text x="120" y="135" fill="#6b7394" fontSize="10" textAnchor="middle">0.2-0.3s</text>
      
      {/* Flèche */}
      <path d="M 170 75 L 210 75" stroke="#6b7394" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Étape 2: Analyse */}
      <circle cx="270" cy="75" r="35" fill="#e84855" opacity="0.2" />
      <text x="270" y="70" fill="#e84855" fontSize="24" textAnchor="middle">🧠</text>
      <text x="270" y="120" fill="#2d3748" fontSize="12" textAnchor="middle" fontWeight="600">Analyse</text>
      <text x="270" y="135" fill="#6b7394" fontSize="10" textAnchor="middle">0.3-0.4s</text>
      
      {/* Flèche */}
      <path d="M 320 75 L 360 75" stroke="#6b7394" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Étape 3: Décision */}
      <circle cx="420" cy="75" r="35" fill="#f59e0b" opacity="0.2" />
      <text x="420" y="70" fill="#f59e0b" fontSize="24" textAnchor="middle">💭</text>
      <text x="420" y="120" fill="#2d3748" fontSize="12" textAnchor="middle" fontWeight="600">Décision</text>
      <text x="420" y="135" fill="#6b7394" fontSize="10" textAnchor="middle">0.1-0.2s</text>
      
      {/* Flèche */}
      <path d="M 470 75 L 510 75" stroke="#6b7394" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Étape 4: Action */}
      <circle cx="570" cy="75" r="35" fill="#10b981" opacity="0.2" />
      <text x="570" y="70" fill="#10b981" fontSize="24" textAnchor="middle">🦶</text>
      <text x="570" y="120" fill="#2d3748" fontSize="12" textAnchor="middle" fontWeight="600">Action</text>
      <text x="570" y="135" fill="#6b7394" fontSize="10" textAnchor="middle">0.1-0.2s</text>
      
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#6b7394" />
        </marker>
      </defs>
    </svg>
    <div style={{ fontSize: 11, color: '#6b7394', marginTop: 12, textAlign: 'center', fontStyle: 'italic' }}>
      Total : environ 1 seconde (peut doubler avec fatigue/alcool/drogue)
    </div>
  </div>
)

export const SchemaEffetsFatigue = () => (
  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
    {[
      { titre: 'Temps de réaction', effet: 'Augmenté x2', icon: '⏱️', color: '#e84855' },
      { titre: 'Champ visuel', effet: 'Rétréci', icon: '👁️', color: '#f59e0b' },
      { titre: 'Appréciation vitesses', effet: 'Altérée', icon: '🎯', color: '#e84855' },
      { titre: 'État émotionnel', effet: 'Nervosité', icon: '😤', color: '#f59e0b' },
      { titre: 'Risque accident', effet: 'Multiplié x8', icon: '⚠️', color: '#e84855' }
    ].map((item, i) => (
      <div key={i} style={{ background: '#3a1a1a', border: `2px solid ${item.color}33`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f2f8', marginBottom: 4 }}>{item.titre}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: item.color }}>{item.effet}</div>
      </div>
    ))}
  </div>
)

export const SchemaDistracteurs = () => (
  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
    {[
      { nom: 'Téléphone', sanction: '-3 pts\n135€', icon: '📱' },
      { nom: 'Écrans', sanction: '-3 pts\n1500€', icon: '📺' },
      { nom: 'Fumer', sanction: 'Interdit*', icon: '🚬' },
      { nom: 'Manger', sanction: 'Interdit*', icon: '🍔' },
      { nom: 'Musique forte', sanction: 'Danger', icon: '🔊' },
      { nom: 'Oreillettes', sanction: 'Interdit', icon: '🎧' }
    ].map((item, i) => (
      <div key={i} style={{ background: '#3a1a1a', border: '1px solid #5a2d2d', borderRadius: 10, padding: 12, textAlign: 'center' }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f2f8', marginBottom: 4 }}>{item.nom}</div>
        <div style={{ fontSize: 10, color: '#e6b8b8', whiteSpace: 'pre-line' }}>{item.sanction}</div>
      </div>
    ))}
  </div>
)

// Schémas pour le cours Éléments mécaniques

export const SchemaTableauBord = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>
      Tableau de bord - Principaux indicateurs
    </div>
    <svg viewBox="0 0 700 200" style={{ width: '100%', height: 'auto' }}>
      {/* Fond tableau de bord */}
      <rect x="50" y="30" width="600" height="140" fill="#1a1f2e" rx="8" />
      
      {/* Compte-tours */}
      <circle cx="150" cy="100" r="45" fill="#2d3748" stroke="#4f6ef7" strokeWidth="3" />
      <text x="150" y="95" fill="#4f6ef7" fontSize="12" textAnchor="middle" fontWeight="600">x1000</text>
      <text x="150" y="110" fill="#4f6ef7" fontSize="10" textAnchor="middle">tr/min</text>
      <path d="M 150 100 L 170 85" stroke="#e8ff47" strokeWidth="3" strokeLinecap="round" />
      <text x="150" y="160" fill="#d0d2e0" fontSize="11" textAnchor="middle" fontWeight="600">Compte-tours</text>
      
      {/* Compteur vitesse */}
      <circle cx="300" cy="100" r="50" fill="#2d3748" stroke="#10b981" strokeWidth="4" />
      <text x="300" y="95" fill="#10b981" fontSize="20" textAnchor="middle" fontWeight="700">90</text>
      <text x="300" y="112" fill="#10b981" fontSize="11" textAnchor="middle">km/h</text>
      <path d="M 300 100 L 285 70" stroke="#e8ff47" strokeWidth="4" strokeLinecap="round" />
      <text x="300" y="165" fill="#d0d2e0" fontSize="11" textAnchor="middle" fontWeight="600">Vitesse</text>
      
      {/* Jauge essence */}
      <g transform="translate(450, 75)">
        <rect x="-40" y="0" width="80" height="50" fill="#2d3748" rx="6" />
        <rect x="-35" y="5" width="25" height="10" fill="#e84855" rx="2" />
        <rect x="-7" y="5" width="25" height="10" fill="#f59e0b" rx="2" />
        <rect x="21" y="5" width="10" height="10" fill="#10b981" rx="2" />
        <text x="0" y="30" fill="#d0d2e0" fontSize="10" textAnchor="middle">⛽ E — F</text>
        <path d="M -20 15 L -10 5" stroke="#e8ff47" strokeWidth="2" />
        <text x="0" y="65" fill="#d0d2e0" fontSize="11" textAnchor="middle" fontWeight="600">Jauge essence</text>
      </g>
      
      {/* Température */}
      <g transform="translate(580, 75)">
        <rect x="-35" y="0" width="70" height="50" fill="#2d3748" rx="6" />
        <rect x="-30" y="5" width="30" height="10" fill="#4f6ef7" rx="2" />
        <rect x="3" y="5" width="30" height="10" fill="#e84855" rx="2" />
        <text x="0" y="30" fill="#d0d2e0" fontSize="9" textAnchor="middle">🌡️ C — H</text>
        <path d="M -10 15 L 0 5" stroke="#e8ff47" strokeWidth="2" />
        <text x="0" y="65" fill="#d0d2e0" fontSize="10" textAnchor="middle" fontWeight="600">Température</text>
      </g>
    </svg>
    <div style={{ fontSize: 11, color: '#6b7394', marginTop: 12, textAlign: 'center', fontStyle: 'italic' }}>
      Instruments de bord essentiels pour surveiller le véhicule
    </div>
  </div>
)

export const SchemaVoyantsRouges = () => (
  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
    {[
      { nom: 'Huile moteur', icon: '🛢️', action: 'ARRÊT IMMÉDIAT', color: '#e84855' },
      { nom: 'Température', icon: '🌡️', action: 'ARRÊT IMMÉDIAT', color: '#e84855' },
      { nom: 'Freins', icon: '🛑', action: 'ARRÊT IMMÉDIAT', color: '#e84855' },
      { nom: 'Batterie', icon: '🔋', action: 'Recharger/changer', color: '#e84855' },
      { nom: 'Ceinture', icon: '🔒', action: 'Attacher ceinture', color: '#e84855' },
      { nom: 'Airbag', icon: '💺', action: 'Vérifier état', color: '#e84855' }
    ].map((item, i) => (
      <div key={i} style={{ background: '#3a1a1a', border: `2px solid ${item.color}`, borderRadius: 10, padding: 14, textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 6 }}>{item.icon}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f2f8', marginBottom: 4 }}>{item.nom}</div>
        <div style={{ fontSize: 10, color: item.color, fontWeight: 600 }}>{item.action}</div>
      </div>
    ))}
  </div>
)

export const SchemaVoyantsOrange = () => (
  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
    {[
      { nom: 'Plaquettes', icon: '🔧', desc: 'À changer', color: '#f59e0b' },
      { nom: 'Carburant', icon: '⛽', desc: 'Réserve ~50km', color: '#f59e0b' },
      { nom: 'Préchauffage', icon: '🔥', desc: 'Diesel - Attendre', color: '#f59e0b' },
      { nom: 'Pneus', icon: '🛞', desc: 'Vérifier pression', color: '#f59e0b' },
      { nom: 'ABS', icon: '⚙️', desc: 'Problème ABS', color: '#f59e0b' },
      { nom: 'Moteur', icon: '🔴', desc: 'Garage urgent', color: '#f59e0b' }
    ].map((item, i) => (
      <div key={i} style={{ background: '#3a2a1a', border: `1px solid ${item.color}66`, borderRadius: 10, padding: 12, textAlign: 'center' }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f2f8', marginBottom: 3 }}>{item.nom}</div>
        <div style={{ fontSize: 10, color: item.color }}>{item.desc}</div>
      </div>
    ))}
  </div>
)

export const SchemaPositionsCle = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>
      Positions de la clé de contact
    </div>
    <svg viewBox="0 0 700 250" style={{ width: '100%', height: 'auto' }}>
      {/* Position I */}
      <g transform="translate(100, 80)">
        <circle cx="0" cy="0" r="30" fill="#2d3748" stroke="#6b7394" strokeWidth="3" />
        <text x="0" y="5" fill="#6b7394" fontSize="20" textAnchor="middle" fontWeight="700">I</text>
        <text x="0" y="55" fill="#2d3748" fontSize="12" textAnchor="middle" fontWeight="600">Insertion</text>
        <text x="0" y="70" fill="#6b7394" fontSize="10" textAnchor="middle">clé</text>
      </g>
      
      {/* Flèche */}
      <path d="M 135 80 L 165 80" stroke="#6b7394" strokeWidth="2" markerEnd="url(#arrow2)" />
      
      {/* Position II */}
      <g transform="translate(200, 80)">
        <circle cx="0" cy="0" r="30" fill="#2d3748" stroke="#4f6ef7" strokeWidth="3" />
        <text x="0" y="5" fill="#4f6ef7" fontSize="20" textAnchor="middle" fontWeight="700">II</text>
        <text x="0" y="55" fill="#2d3748" fontSize="12" textAnchor="middle" fontWeight="600">Antivol</text>
        <text x="0" y="70" fill="#6b7394" fontSize="10" textAnchor="middle">Déverrouillage</text>
      </g>
      
      {/* Flèche */}
      <path d="M 235 80 L 265 80" stroke="#6b7394" strokeWidth="2" markerEnd="url(#arrow2)" />
      
      {/* Position III */}
      <g transform="translate(300, 80)">
        <circle cx="0" cy="0" r="30" fill="#2d3748" stroke="#f59e0b" strokeWidth="3" />
        <text x="0" y="5" fill="#f59e0b" fontSize="19" textAnchor="middle" fontWeight="700">III</text>
        <text x="0" y="55" fill="#2d3748" fontSize="12" textAnchor="middle" fontWeight="600">Contact</text>
        <text x="0" y="70" fill="#6b7394" fontSize="10" textAnchor="middle">Accessoires ON</text>
        <text x="0" y="90" fill="#e84855" fontSize="9" textAnchor="middle" fontWeight="600">Voyants allumés</text>
      </g>
      
      {/* Flèche */}
      <path d="M 335 80 L 365 80" stroke="#6b7394" strokeWidth="2" markerEnd="url(#arrow2)" />
      
      {/* Position IV */}
      <g transform="translate(400, 80)">
        <circle cx="0" cy="0" r="30" fill="#2d3748" stroke="#10b981" strokeWidth="3" />
        <text x="0" y="5" fill="#10b981" fontSize="18" textAnchor="middle" fontWeight="700">IV</text>
        <text x="0" y="55" fill="#2d3748" fontSize="12" textAnchor="middle" fontWeight="600">Démarrage</text>
        <text x="0" y="70" fill="#6b7394" fontSize="10" textAnchor="middle">Moteur ON</text>
        <text x="0" y="90" fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="600">Relâcher après</text>
      </g>
      
      {/* Flèche retour */}
      <path d="M 420 110 Q 450 150, 350 150 Q 250 150, 320 110" stroke="#10b981" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrow-green2)" />
      <text x="370" y="170" fill="#10b981" fontSize="11" textAnchor="middle" fontStyle="italic">Retour auto en III</text>
      
      <defs>
        <marker id="arrow2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#6b7394" />
        </marker>
        <marker id="arrow-green2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#10b981" />
        </marker>
      </defs>
    </svg>
    <div style={{ fontSize: 11, color: '#e84855', marginTop: 12, textAlign: 'center', fontWeight: 600 }}>
      ⚠️ Ne jamais maintenir la clé en position IV après le démarrage !
    </div>
  </div>
)

export const SchemaTypesFeux = () => (
  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
    {[
      { nom: 'Feux de position', portee: '150m', usage: 'Être vu', icon: '🟡', obligatoire: 'Nuit/intempéries' },
      { nom: 'Feux croisement', portee: '30m', usage: 'Voir sans éblouir', icon: '💡', obligatoire: 'Toujours de nuit' },
      { nom: 'Feux de route', portee: '100m', usage: 'Voir loin', icon: '💫', obligatoire: 'Routes non éclairées' },
      { nom: 'Feux brouillard AV', portee: 'Bas', usage: 'Brouillard/neige', icon: '🌫️', obligatoire: 'Optionnel' },
      { nom: 'Feux brouillard AR', portee: '-', usage: 'Être vu', icon: '🔴', obligatoire: 'Brouillard/neige' },
      { nom: 'Feux diurnes', portee: '-', usage: 'Jour (auto)', icon: '⚪', obligatoire: 'Auto sur +2011' }
    ].map((feu, i) => (
      <div key={i} style={{ background: i < 3 ? '#1a3a1a' : '#3a3a1a', border: i < 3 ? '1px solid #2d5a2d' : '1px solid #5a4d2d', borderRadius: 10, padding: 14, textAlign: 'center' }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>{feu.icon}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f2f8', marginBottom: 3 }}>{feu.nom}</div>
        <div style={{ fontSize: 10, color: '#10b981', marginBottom: 2 }}>Portée: {feu.portee}</div>
        <div style={{ fontSize: 9, color: '#6b7394', marginBottom: 4 }}>{feu.usage}</div>
        <div style={{ fontSize: 9, color: '#e8ff47', fontWeight: 600 }}>{feu.obligatoire}</div>
      </div>
    ))}
  </div>
)

// Schémas Équipements de sécurité
export const SchemaSecuriteActivePassive = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
    <div style={{ background: '#1a3a1a', border: '2px solid #10b981', borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#10b981', marginBottom: 12, textAlign: 'center' }}>SÉCURITÉ ACTIVE</div>
      <div style={{ fontSize: 13, color: '#b8e6b8', marginBottom: 8, textAlign: 'center', fontStyle: 'italic' }}>= ÉVITER l'accident</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#d0d2e0' }}>
        <div>✓ Direction assistée</div>
        <div>✓ Pneumatiques</div>
        <div>✓ Suspensions</div>
        <div>✓ Freins</div>
        <div>✓ Éclairage</div>
        <div>✓ ABS, AFU, ESP</div>
        <div>✓ Régulateur/Limiteur</div>
      </div>
    </div>
    <div style={{ background: '#3a1a1a', border: '2px solid #e84855', borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#e84855', marginBottom: 12, textAlign: 'center' }}>SÉCURITÉ PASSIVE</div>
      <div style={{ fontSize: 13, color: '#e6b8b8', marginBottom: 8, textAlign: 'center', fontStyle: 'italic' }}>= LIMITER les blessures</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#d0d2e0' }}>
        <div>✓ Ceinture de sécurité</div>
        <div>✓ Airbags</div>
        <div>✓ Appui-tête</div>
        <div>✓ Carrosserie déformable</div>
        <div>✓ Sièges enfants</div>
        <div>✓ Gilet + triangle</div>
      </div>
    </div>
  </div>
)

export const SchemaABS_AFU_ESP = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 16 }}>
    {[
      { nom: 'ABS', titre: 'Anti-Blocage', desc: 'Empêche blocage roues', avantage: 'Garde le contrôle', limite: 'NE réduit PAS distance freinage', color: '#4f6ef7' },
      { nom: 'AFU', titre: 'Aide Freinage Urgence', desc: 'Augmente force freinage auto', avantage: '+ Active feux détresse', limite: 'Couplée avec ABS', color: '#f59e0b' },
      { nom: 'ESP', titre: 'Contrôle Trajectoire', desc: 'Corrige trajectoire virage', avantage: 'Agit freins + accélérateur', limite: 'Vitesse trop élevée = inefficace', color: '#10b981' }
    ].map((sys, i) => (
      <div key={i} style={{ background: '#1e2230', border: `2px solid ${sys.color}`, borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: sys.color, textAlign: 'center', marginBottom: 4 }}>{sys.nom}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f2f8', textAlign: 'center', marginBottom: 12 }}>{sys.titre}</div>
        <div style={{ fontSize: 13, color: '#d0d2e0', marginBottom: 8 }}>{sys.desc}</div>
        <div style={{ fontSize: 12, color: '#10b981', marginBottom: 8 }}>✓ {sys.avantage}</div>
        <div style={{ fontSize: 11, color: '#e84855', fontStyle: 'italic' }}>⚠️ {sys.limite}</div>
      </div>
    ))}
  </div>
)

export const SchemaAirbags = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>Emplacements des airbags</div>
    <svg viewBox="0 0 600 300" style={{ width: '100%', height: 'auto' }}>
      {/* Voiture vue de face simplifiée */}
      <rect x="150" y="100" width="300" height="150" fill="#2d3748" rx="20" />
      
      {/* Airbag conducteur (volant) */}
      <circle cx="220" cy="175" r="25" fill="#e84855" opacity="0.7" />
      <text x="220" y="235" fill="#2d3748" fontSize="11" textAnchor="middle" fontWeight="600">Frontal conducteur</text>
      
      {/* Airbag passager */}
      <circle cx="380" cy="175" r="25" fill="#e84855" opacity="0.7" />
      <text x="380" y="235" fill="#2d3748" fontSize="11" textAnchor="middle" fontWeight="600">Frontal passager</text>
      
      {/* Airbags latéraux */}
      <circle cx="160" cy="150" r="15" fill="#f59e0b" opacity="0.7" />
      <text x="95" y="155" fill="#2d3748" fontSize="10" textAnchor="middle" fontWeight="600">Latéral</text>
      <circle cx="440" cy="150" r="15" fill="#f59e0b" opacity="0.7" />
      <text x="505" y="155" fill="#2d3748" fontSize="10" textAnchor="middle" fontWeight="600">Latéral</text>
      
      {/* Rideaux */}
      <rect x="155" y="105" width="10" height="60" fill="#4f6ef7" opacity="0.5" rx="5" />
      <text x="115" y="80" fill="#2d3748" fontSize="10" textAnchor="middle" fontWeight="600">Rideau</text>
      <rect x="435" y="105" width="10" height="60" fill="#4f6ef7" opacity="0.5" rx="5" />
      <text x="485" y="80" fill="#2d3748" fontSize="10" textAnchor="middle" fontWeight="600">Rideau</text>
      
      {/* Genoux */}
      <circle cx="220" cy="230" r="12" fill="#10b981" opacity="0.6" />
      <text x="220" y="270" fill="#2d3748" fontSize="10" textAnchor="middle" fontWeight="600">Genoux</text>
    </svg>
  </div>
)

export const SchemaSiegesEnfants = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginTop: 16 }}>
    {[
      { age: '<10 kg\n<70 cm', type: 'Lit-nacelle', desc: 'ou dos route', icon: '🛏️', color: '#e84855' },
      { age: '<13 kg\n<80 cm', type: 'Siège dos', desc: 'à la route', icon: '👶', color: '#f59e0b' },
      { age: '9-18 kg\n<1 m', type: 'Siège baquet', desc: 'face route', icon: '🪑', color: '#4f6ef7' },
      { age: '15-36 kg\n<1,50 m', type: 'Rehausseur', desc: '+ ceinture', icon: '📐', color: '#10b981' }
    ].map((siege, i) => (
      <div key={i} style={{ background: '#1e2230', border: `2px solid ${siege.color}`, borderRadius: 10, padding: 14, textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 6 }}>{siege.icon}</div>
        <div style={{ fontSize: 11, color: '#6b7394', marginBottom: 6, whiteSpace: 'pre-line' }}>{siege.age}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f2f8', marginBottom: 3 }}>{siege.type}</div>
        <div style={{ fontSize: 11, color: siege.color }}>{siege.desc}</div>
      </div>
    ))}
  </div>
)

// Schémas Intersections
export const SchemaFeuxTricolores = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: 16, background: '#f5f7fa', borderRadius: 12, padding: 20 }}>
    {[
      { color: '#10b981', text: 'VERT', desc: 'Passage autorisé' },
      { color: '#f59e0b', text: 'ORANGE', desc: 'Arrêt sauf danger' },
      { color: '#e84855', text: 'ROUGE', desc: 'Arrêt obligatoire' }
    ].map((feu, i) => (
      <div key={i} style={{ textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: feu.color, margin: '0 auto 12px', boxShadow: `0 4px 12px ${feu.color}66` }} />
        <div style={{ fontSize: 16, fontWeight: 700, color: '#2d3748', marginBottom: 4 }}>{feu.text}</div>
        <div style={{ fontSize: 12, color: '#6b7394' }}>{feu.desc}</div>
      </div>
    ))}
  </div>
)

export const SchemaAgent = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12, marginTop: 16 }}>
    {[
      { position: 'Profil', action: 'PASSEZ', icon: '👮', color: '#10b981' },
      { position: 'Face bras levé', action: 'STOP', icon: '🛑', color: '#e84855' },
      { position: 'Face/Dos', action: 'STOP', icon: '⛔', color: '#e84855' },
      { position: 'Haut-bas', action: 'Ralentir', icon: '⚠️', color: '#f59e0b' },
      { position: 'Circulaire', action: 'Circulez', icon: '🔄', color: '#10b981' }
    ].map((geste, i) => (
      <div key={i} style={{ background: '#1e2230', border: `2px solid ${geste.color}44`, borderRadius: 10, padding: 12, textAlign: 'center' }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>{geste.icon}</div>
        <div style={{ fontSize: 11, color: '#6b7394', marginBottom: 4 }}>{geste.position}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: geste.color }}>{geste.action}</div>
      </div>
    ))}
  </div>
)

export const SchemaPrioriteDroite = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>Priorité à droite : le jaune passe en premier</div>
    <svg viewBox="0 0 400 400" style={{ width: '100%', height: 'auto' }}>
      {/* Intersection */}
      <rect x="150" y="0" width="100" height="400" fill="#6b7394" opacity="0.3" />
      <rect x="0" y="150" width="400" height="100" fill="#6b7394" opacity="0.3" />
      
      {/* Voiture prioritaire (jaune) - vient de droite */}
      <rect x="280" y="175" width="40" height="25" fill="#e8ff47" rx="3" />
      <text x="300" y="230" fill="#2d3748" fontSize="14" fontWeight="700" textAnchor="middle">PRIORITAIRE</text>
      <path d="M 260 190 L 280 190" stroke="#e8ff47" strokeWidth="3" markerEnd="url(#arrow-yellow)" />
      
      {/* Voiture doit céder (rouge) - vient du bas */}
      <rect x="187" y="280" width="25" height="40" fill="#e84855" rx="3" />
      <text x="200" y="340" fill="#2d3748" fontSize="14" fontWeight="700" textAnchor="middle">DOIT CÉDER</text>
      <path d="M 200 260 L 200 280" stroke="#e84855" strokeWidth="3" markerEnd="url(#arrow-red)" />
      
      <defs>
        <marker id="arrow-yellow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#e8ff47" />
        </marker>
        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#e84855" />
        </marker>
      </defs>
    </svg>
  </div>
)

export const SchemaGiratoireRondPoint = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
    {[
      { type: 'Carrefour à sens giratoire', priorite: 'Cédez le passage (entrant)', color: '#10b981', panneau: '🔺' },
      { type: 'Rond-point', priorite: 'Priorité à droite (entrant prioritaire)', color: '#e84855', panneau: '⛔' }
    ].map((item, i) => (
      <div key={i} style={{ background: '#1e2230', border: `2px solid ${item.color}`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>{item.panneau}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f2f8', marginBottom: 8 }}>{item.type}</div>
        <div style={{ fontSize: 12, color: item.color }}>{item.priorite}</div>
      </div>
    ))}
  </div>
)

// Schémas Réglementation
export const SchemaPermisPoints = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>Évolution du capital points en probatoire</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#2d3748', marginBottom: 12 }}>Traditionnel (3 ans)</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          {[
            { pts: '6 pts', an: 'Début' },
            { pts: '8 pts', an: 'An 1' },
            { pts: '10 pts', an: 'An 2' },
            { pts: '12 pts', an: 'An 3' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#4f6ef7' }}>{item.pts}</div>
              <div style={{ fontSize: 10, color: '#6b7394' }}>{item.an}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#2d3748', marginBottom: 12 }}>Conduite accompagnée (2 ans)</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          {[
            { pts: '6 pts', an: 'Début' },
            { pts: '9 pts', an: 'An 1' },
            { pts: '12 pts', an: 'An 2' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>{item.pts}</div>
              <div style={{ fontSize: 10, color: '#6b7394' }}>{item.an}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export const SchemaPAS = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
    {[
      { lettre: 'P', mot: 'PROTÉGER', actions: ['Feux détresse', 'Gilet', 'Triangle 30m', 'Couper contact'], color: '#4f6ef7', icon: '🦺' },
      { lettre: 'A', mot: 'ALERTER', actions: ['112 (européen)', '15 (SAMU)', '18 (pompiers)', '17 (police)'], color: '#f59e0b', icon: '📞' },
      { lettre: 'S', mot: 'SECOURIR', actions: ['Rassurer', 'Couvrir', 'NE PAS déplacer', 'NE PAS donner à boire'], color: '#10b981', icon: '🩹' }
    ].map((etape, i) => (
      <div key={i} style={{ background: '#1e2230', border: `3px solid ${etape.color}`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>{etape.icon}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: etape.color, marginBottom: 4 }}>{etape.lettre}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f2f8', marginBottom: 12 }}>{etape.mot}</div>
        {etape.actions.map((action, j) => (
          <div key={j} style={{ fontSize: 11, color: '#d0d2e0', marginBottom: 4 }}>• {action}</div>
        ))}
      </div>
    ))}
  </div>
)

// Schémas Signalisation
export const SchemaFormesPanneaux = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginTop: 16 }}>
    {[
      { forme: '▲', nom: 'TRIANGLE', signif: 'Danger', color: '#e84855' },
      { forme: '●', nom: 'ROND', signif: 'Ordre', color: '#4f6ef7' },
      { forme: '■', nom: 'CARRÉ', signif: 'Indication', color: '#10b981' },
      { forme: '▬', nom: 'RECTANGLE', signif: 'Localisation', color: '#f59e0b' },
      { forme: '➤', nom: 'FLÈCHE', signif: 'Direction', color: '#6b7394' }
    ].map((item, i) => (
      <div key={i} style={{ background: '#1e2230', border: `2px solid ${item.color}44`, borderRadius: 10, padding: 14, textAlign: 'center' }}>
        <div style={{ fontSize: 40, color: item.color, marginBottom: 6 }}>{item.forme}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#f0f2f8', marginBottom: 3 }}>{item.nom}</div>
        <div style={{ fontSize: 11, color: item.color }}>{item.signif}</div>
      </div>
    ))}
  </div>
)

export const SchemaLignesSol = () => (
  <div style={{ background: '#f5f7fa', border: '1px solid #d0d5dd', borderRadius: 12, padding: 20, marginTop: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 16, textAlign: 'center' }}>Types de lignes au sol</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[
        { nom: 'Continue', ligne: '━━━━━━━━━━━', desc: 'INTERDIT franchir et chevaucher', color: '#e84855' },
        { nom: 'Discontinue', ligne: '╍ ╍ ╍ ╍ ╍ ╍', desc: 'Autorisé franchir et chevaucher', color: '#10b981' },
        { nom: 'Dissuasion', ligne: '━ ━ ━ ━ ━', desc: 'Déconseillé dépasser (sauf lents/vélos)', color: '#f59e0b' },
        { nom: 'Mixte', ligne: '╍━╍━╍━╍━╍━', desc: 'Dépend de quel côté vous êtes', color: '#4f6ef7' }
      ].map((ligne, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 24, color: ligne.color, fontWeight: 700, minWidth: 150 }}>{ligne.ligne}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#2d3748', marginBottom: 2 }}>{ligne.nom}</div>
            <div style={{ fontSize: 11, color: '#6b7394' }}>{ligne.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export const SchemaVitessesLimites = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 10, marginTop: 16 }}>
    {[
      { vitesse: '50', desc: 'Agglo', color: '#e84855' },
      { vitesse: '80', desc: 'Route 2 voies', color: '#f59e0b' },
      { vitesse: '90', desc: '3+ voies', color: '#4f6ef7' },
      { vitesse: '110', desc: 'Terre-plein', color: '#10b981' },
      { vitesse: '130', desc: 'Autoroute', color: '#4f6ef7' }
    ].map((item, i) => (
      <div key={i} style={{ background: '#1e2230', border: `3px solid ${item.color}`, borderRadius: '50%', width: 90, height: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#f0f2f8' }}>{item.vitesse}</div>
        <div style={{ fontSize: 10, color: item.color, fontWeight: 600 }}>{item.desc}</div>
      </div>
    ))}
  </div>
)
