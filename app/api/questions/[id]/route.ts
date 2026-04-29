// app/api/questions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { requireAdmin } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = await params
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const id = parseInt(paramId)
  const { texte, theme_id, image_url, video_url, explication, reponses } = await req.json()

  const { error: qError } = await supabase.from('questions')
    .update({ texte, theme_id, image_url: image_url || null, video_url: video_url || null, explication })
    .eq('id', id)

  if (qError) return NextResponse.json({ error: qError.message }, { status: 500 })

  if (reponses?.length > 0) {
    await supabase.from('reponses').delete().eq('question_id', id)
    const reponsesData = reponses.map((r: any, i: number) => ({ question_id: id, texte: r.texte, est_correcte: r.est_correcte, ordre: i }))
    const { error: rError } = await supabase.from('reponses').insert(reponsesData)
    if (rError) return NextResponse.json({ error: rError.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Question mise à jour' })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  const { error } = await supabase.from('questions').delete().eq('id', parseInt(id))
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ message: 'Question supprimée' })
}
