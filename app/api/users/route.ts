// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'
import { requireAdmin } from '@/lib/auth'

// GET /api/users — liste des élèves (admin)
export async function GET(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const { data, error } = await supabase
    .from('utilisateurs')
    .select('id, email, prenom, nom, role, actif, numero_dossier, created_at')
    .eq('role', 'eleve')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/users — créer un élève (admin)
export async function POST(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const { email, password, prenom, nom, numero_dossier } = await req.json()
  if (!email || !password || !prenom || !nom) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
  }

  if (numero_dossier && !/^\d{12}$/.test(numero_dossier)) {
    return NextResponse.json({ error: 'Le n° NEPH doit contenir exactement 12 chiffres' }, { status: 400 })
  }

  const hash = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from('utilisateurs')
    .insert({ email: email.toLowerCase(), mot_de_passe: hash, prenom, nom, role: 'eleve', numero_dossier: numero_dossier || null })
    .select('id, email, prenom, nom, role, actif, numero_dossier')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
