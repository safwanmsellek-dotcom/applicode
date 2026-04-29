'use client'
// app/page.tsx — Landing page
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#0d0f14', color: '#f0f2f8', fontFamily: 'sans-serif' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ color: '#e8ff47', fontWeight: 800, fontSize: 20 }}>🚗 CodeRoute</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => router.push('/login')} style={{ background: 'transparent', border: '1px solid #2a2f3d', borderRadius: 8, color: '#f0f2f8', padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Connexion
          </button>
          <button onClick={() => router.push('/register')} style={{ background: '#e8ff47', border: 'none', borderRadius: 8, color: '#0d0f14', padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            S'inscrire
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 24px 60px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎯</div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          Révisez le <span style={{ color: '#e8ff47' }}>code de la route</span> en ligne
        </h1>
        <p style={{ color: '#6b7394', fontSize: 'clamp(14px, 2.5vw, 17px)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          Entraînez-vous avec des séries thématiques, passez des examens blancs en conditions réelles et suivez votre progression. Accessible sur mobile, tablette et ordinateur.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/register')} style={{ background: '#e8ff47', color: '#0d0f14', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Commencer gratuitement →
          </button>
          <button onClick={() => router.push('/login')} style={{ background: '#161920', color: '#f0f2f8', border: '1px solid #2a2f3d', borderRadius: 10, padding: '14px 28px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
            J'ai déjà un compte
          </button>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {[
            { icon: '📚', title: 'Entraînement par thème', desc: 'Signalisation, priorités, éco-conduite… Choisissez votre thème et progressez à votre rythme avec correction immédiate.' },
            { icon: '🎯', title: 'Examen blanc', desc: '40 questions aléatoires avec chronomètre de 20 secondes, comme le jour J. Correction détaillée à la fin.' },
            { icon: '📊', title: 'Suivi de progression', desc: 'Consultez vos scores, votre taux de réussite et identifiez les thèmes à retravailler grâce à votre tableau de bord.' },
            { icon: '🎬', title: 'Vidéos & images HD', desc: 'Des situations de conduite réalistes en photos et vidéos, conformes au format du nouvel examen.' },
            { icon: '🔊', title: 'Explications vocales', desc: 'Chaque correction est accompagnée d\'une explication que vous pouvez écouter en audio pour mieux retenir.' },
            { icon: '📱', title: 'Mobile-first', desc: 'Conçu en priorité pour smartphone. Révisez partout : dans le bus, en pause, avant de dormir.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: '#6b7394', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={{ textAlign: 'center', padding: '40px 24px 80px' }}>
        <div style={{ background: '#161920', border: '1px solid #2a2f3d', borderRadius: 16, padding: '40px 24px', maxWidth: 580, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Prêt(e) à décrocher votre code ?</h2>
          <p style={{ color: '#6b7394', fontSize: 14, marginBottom: 24 }}>Rejoignez les élèves de notre auto-école et commencez à vous entraîner dès maintenant.</p>
          <button onClick={() => router.push('/register')} style={{ background: '#e8ff47', color: '#0d0f14', border: 'none', borderRadius: 10, padding: '13px 30px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Créer mon compte →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e2230', padding: '24px', textAlign: 'center', fontSize: 12, color: '#6b7394' }}>
        <a href="/mentions-legales" style={{ color: '#6b7394', textDecoration: 'none' }}>Mentions légales & Confidentialité</a>
        <span style={{ margin: '0 10px' }}>•</span>
        © {new Date().getFullYear()} CodeRoute — Auto-école
      </footer>
    </div>
  )
}
