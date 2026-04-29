// app/mentions-legales/page.tsx
export default function MentionsLegalesPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px', fontFamily: 'sans-serif', color: '#f0f2f8', background: '#0d0f14', minHeight: '100vh' }}>
      <a href="/" style={{ color: '#e8ff47', textDecoration: 'none', fontSize: 13 }}>← Retour</a>
      <h1 style={{ fontSize: 28, margin: '24px 0 32px', color: '#e8ff47' }}>Mentions légales & Politique de confidentialité</h1>

      {[
        {
          title: '1. Éditeur du site',
          content: `Le site CodeRoute est édité par votre auto-école. Pour toute question, contactez-nous à l'adresse email indiquée sur le site.`
        },
        {
          title: '2. Données personnelles (RGPD)',
          content: `Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants sur vos données :
• Droit d'accès à vos données personnelles
• Droit de rectification
• Droit à l'effacement ("droit à l'oubli")
• Droit à la portabilité

Les données collectées (nom, prénom, email) sont utilisées uniquement pour le fonctionnement de la plateforme et ne sont jamais vendues à des tiers.

Pour exercer vos droits, contactez-nous par email.`
        },
        {
          title: '3. Cookies',
          content: `Nous utilisons des cookies techniques nécessaires au fonctionnement du site (session de connexion) et des cookies analytiques anonymes pour améliorer nos services. Vous pouvez refuser les cookies non essentiels via le bandeau de consentement.`
        },
        {
          title: '4. Hébergement',
          content: `Le site est hébergé sur Vercel Inc. et utilise les services Supabase pour la base de données. Ces prestataires sont conformes au RGPD.`
        },
        {
          title: '5. Propriété intellectuelle',
          content: `Les questions et contenus pédagogiques sont la propriété de l'auto-école. Toute reproduction est interdite sans autorisation.`
        },
      ].map(section => (
        <div key={section.title} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, color: '#e8ff47', marginBottom: 12 }}>{section.title}</h2>
          <p style={{ color: '#a0a8c0', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{section.content}</p>
        </div>
      ))}

      <p style={{ color: '#6b7394', fontSize: 12, marginTop: 48 }}>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
    </div>
  )
}
