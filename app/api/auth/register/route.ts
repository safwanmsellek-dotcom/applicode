// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password, prenom, nom, numero_dossier } = await req.json()

  if (!email || !password || !prenom || !nom) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Mot de passe trop court (6 caractères min)' }, { status: 400 })
  }

  if (numero_dossier && !/^\d{12}$/.test(numero_dossier)) {
    return NextResponse.json({ error: 'Le n° NEPH doit contenir exactement 12 chiffres' }, { status: 400 })
  }

  // Vérifier que l'email n'existe pas déjà
  const { data: existing } = await supabase
    .from('utilisateurs')
    .select('id')
    .eq('email', email.toLowerCase())
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 409 })
  }

  // Hasher le mot de passe
  const hash = await bcrypt.hash(password, 10)

  // Créer le compte
  const { data: user, error } = await supabase
    .from('utilisateurs')
    .insert({ email: email.toLowerCase(), mot_de_passe: hash, prenom, nom, role: 'eleve', numero_dossier: numero_dossier || null })
    .select('id, email, prenom, nom, role')
    .single()

  if (error || !user) {
    return NextResponse.json({ error: 'Erreur lors de la création du compte' }, { status: 500 })
  }

  const token = signToken({ userId: user.id, email: user.email, role: user.role })

  return NextResponse.json({ token, user }, { status: 201 })
}
