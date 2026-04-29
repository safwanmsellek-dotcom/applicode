// app/api/resultats/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUserFromRequest } from '@/lib/auth'

// POST /api/resultats — enregistrer un résultat de série
export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { mode, score, total } = await req.json()

  if (!mode || score === undefined || !total) {
    return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('resultats')
    .insert({ utilisateur_id: user.userId, mode, score, total })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

// GET /api/resultats — historique de l'élève connecté
export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { data, error } = await supabase
    .from('resultats')
    .select('id, mode, score, total, created_at')
    .eq('utilisateur_id', user.userId)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
