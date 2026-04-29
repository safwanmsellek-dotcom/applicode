// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
  }

  // Chercher l'utilisateur en base
  const { data: user, error } = await supabase
    .from('utilisateurs')
    .select('id, email, mot_de_passe, prenom, nom, role, actif')
    .eq('email', email.toLowerCase())
    .single()

  if (error || !user) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
  }

  if (!user.actif) {
    return NextResponse.json({ error: 'Compte suspendu' }, { status: 403 })
  }

  // Vérifier le mot de passe
  const valid = await bcrypt.compare(password, user.mot_de_passe)
  if (!valid) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
  }

  // Créer le token JWT
  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  return NextResponse.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      prenom: user.prenom,
      nom: user.nom,
      role: user.role,
    },
  })
}
