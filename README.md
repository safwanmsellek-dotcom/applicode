# 🚗 CodeRoute — Plateforme E-learning Code de la Route

## Stack technique
- **Frontend + Backend** : Next.js 14 (App Router, TypeScript)
- **Base de données** : Supabase (PostgreSQL hébergé, gratuit)
- **Auth** : JWT maison (bcrypt + jsonwebtoken)
- **Déploiement** : Vercel (gratuit)

---

## 🚀 Installation en 4 étapes

### 1. Créer le projet Supabase
1. Va sur [supabase.com](https://supabase.com) → créer un compte gratuit
2. Créer un nouveau projet
3. Aller dans **SQL Editor** → coller tout le contenu de `supabase/schema.sql` → **Run**
4. Aller dans **Settings → API** → copier :
   - `Project URL`
   - `anon public` key
   - `service_role` key (secret !)

### 2. Configurer les variables d'environnement
Renommer `.env.local.example` en `.env.local` et remplir :

```env
NEXT_PUBLIC_SUPABASE_URL=https://XXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJXXXX
SUPABASE_SERVICE_ROLE_KEY=eyJXXXX
JWT_SECRET=une_chaine_aleatoire_longue_et_secrete_minimum_32_caracteres
```

### 3. Installer et lancer
```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### 4. Connexion admin par défaut
```
Email    : admin@auto-ecole.fr
Password : admin123
```
⚠️ **Change ce mot de passe dès le premier login !** (via Supabase → Table Editor → utilisateurs)

---

## 📁 Structure du projet

```
coderoute/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts        ← POST /api/auth/login
│   │   │   └── register/route.ts     ← POST /api/auth/register
│   │   ├── questions/
│   │   │   ├── route.ts              ← GET (liste) / POST (créer)
│   │   │   └── [id]/route.ts         ← PUT (modifier) / DELETE (supprimer)
│   │   ├── themes/route.ts           ← GET (liste) / POST (créer)
│   │   ├── users/
│   │   │   ├── route.ts              ← GET (liste élèves) / POST (créer)
│   │   │   └── [id]/route.ts         ← PATCH (actif/suspendu) / DELETE
│   │   ├── resultats/route.ts        ← GET (historique) / POST (sauvegarder)
│   │   └── admin/stats/route.ts      ← GET (statistiques globales)
│   │
│   ├── login/page.tsx                ← Page de connexion
│   ├── admin/
│   │   ├── page.tsx                  ← Dashboard admin
│   │   ├── questions/page.tsx        ← Gestion des questions
│   │   ├── eleves/page.tsx           ← Gestion des élèves
│   │   └── themes/page.tsx           ← Gestion des thèmes
│   └── eleve/
│       ├── page.tsx                  ← Dashboard élève
│       └── quiz/page.tsx             ← Moteur de quiz (entraînement + examen)
│
├── components/
│   └── AuthContext.tsx               ← Contexte auth + hook useApi()
│
├── lib/
│   ├── supabase.ts                   ← Clients Supabase
│   └── auth.ts                       ← JWT helpers
│
└── supabase/
    └── schema.sql                    ← Script SQL à exécuter dans Supabase
```

---

## 🔌 API — Résumé des endpoints

| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| POST | `/api/auth/login` | Public | Connexion |
| POST | `/api/auth/register` | Public | Inscription |
| GET | `/api/questions` | Élève/Admin | Liste questions (filtre: `?theme_id=` ou `?mode=exam`) |
| POST | `/api/questions` | Admin | Créer une question |
| PUT | `/api/questions/:id` | Admin | Modifier une question |
| DELETE | `/api/questions/:id` | Admin | Supprimer une question |
| GET | `/api/themes` | Élève/Admin | Liste des thèmes |
| POST | `/api/themes` | Admin | Créer un thème |
| GET | `/api/users` | Admin | Liste des élèves |
| POST | `/api/users` | Admin | Créer un élève |
| PATCH | `/api/users/:id` | Admin | Activer/suspendre |
| DELETE | `/api/users/:id` | Admin | Supprimer un élève |
| GET | `/api/resultats` | Élève | Historique de l'élève |
| POST | `/api/resultats` | Élève | Sauvegarder un résultat |
| GET | `/api/admin/stats` | Admin | Statistiques globales |

---

## 🌍 Déploiement sur Vercel (gratuit)

```bash
npm install -g vercel
vercel
```

Dans le dashboard Vercel → **Settings → Environment Variables** → ajouter les 4 variables de `.env.local`

---

## ➕ Fonctionnalités à ajouter ensuite (idées)
- Upload d'images via Supabase Storage (au lieu d'URL externe)
- Paiement Stripe pour accès premium
- Réinitialisation de mot de passe par email
- Page de profil élève
- Export PDF des statistiques
