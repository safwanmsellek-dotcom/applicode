// app/api/questions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUserFromRequest, requireAdmin } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const themeId = searchParams.get('theme_id')
  const mode = searchParams.get('mode')

  let query = supabase
    .from('questions')
    .select(`id, texte, image_url, video_url, explication, themes ( id, nom ), reponses ( id, texte, est_correcte, ordre )`)
    .order('id')

  if (themeId) query = query.eq('theme_id', themeId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  let questions = data || []
  if (mode === 'exam') questions = questions.sort(() => Math.random() - 0.5).slice(0, 40)
  else questions = questions.sort(() => Math.random() - 0.5)

  questions = questions.map(q => ({ ...q, reponses: q.reponses.sort((a: any, b: any) => a.ordre - b.ordre) }))
  return NextResponse.json(questions)
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const body = await req.json()
  const { texte, theme_id, image_url, video_url, explication, reponses } = body

  if (!texte || !theme_id || !explication) return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
  if (!reponses || reponses.length < 2) return NextResponse.json({ error: 'Au moins 2 réponses requises' }, { status: 400 })
  if (!reponses.some((r: any) => r.est_correcte)) return NextResponse.json({ error: 'Aucune réponse correcte' }, { status: 400 })

  const { data: question, error: qError } = await supabase
    .from('questions')
    .insert({ texte, theme_id, image_url: image_url || null, video_url: video_url || null, explication })
    .select('id').single()

  if (qError || !question) return NextResponse.json({ error: 'Erreur création question' }, { status: 500 })

  const reponsesData = reponses.map((r: any, i: number) => ({ question_id: question.id, texte: r.texte, est_correcte: r.est_correcte, ordre: i }))
  const { error: rError } = await supabase.from('reponses').insert(reponsesData)
  if (rError) return NextResponse.json({ error: rError.message }, { status: 500 })

  return NextResponse.json({ id: question.id, message: 'Question créée' }, { status: 201 })
}
