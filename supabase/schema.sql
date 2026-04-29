-- =============================================
-- SCHÉMA COMPLET — CodeRoute
-- =============================================

-- TABLE : utilisateurs
CREATE TABLE IF NOT EXISTS utilisateurs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  mot_de_passe TEXT NOT NULL,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'eleve' CHECK (role IN ('eleve', 'admin')),
  actif BOOLEAN DEFAULT true,
  numero_dossier TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE : themes
CREATE TABLE IF NOT EXISTS themes (
  id SERIAL PRIMARY KEY,
  nom TEXT UNIQUE NOT NULL
);

INSERT INTO themes (nom) VALUES
  ('Signalisation'),('Priorités'),('Vitesse'),('Alcool & Drogues'),
  ('Sécurité'),('Mécanique'),('Environnement'),('Premiers secours'),('Règles générales')
ON CONFLICT (nom) DO NOTHING;

-- TABLE : questions
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  theme_id INTEGER REFERENCES themes(id) ON DELETE SET NULL,
  texte TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  explication TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE : reponses
CREATE TABLE IF NOT EXISTS reponses (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  texte TEXT NOT NULL,
  est_correcte BOOLEAN DEFAULT false,
  ordre INTEGER NOT NULL
);

-- TABLE : resultats
CREATE TABLE IF NOT EXISTS resultats (
  id SERIAL PRIMARY KEY,
  utilisateur_id UUID REFERENCES utilisateurs(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('entrainement', 'examen')),
  theme_id INTEGER REFERENCES themes(id) ON DELETE SET NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ADMIN PAR DÉFAUT (mot de passe: admin123)
INSERT INTO utilisateurs (email, mot_de_passe, prenom, nom, role)
VALUES ('admin@auto-ecole.fr','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhy8','Admin','École','admin')
ON CONFLICT (email) DO NOTHING;
