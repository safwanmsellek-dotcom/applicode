// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  const { data, error } = await supabase.from('utilisateurs').select('id, email, prenom, nom, actif, created_at').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  const { actif } = await req.json()
  const { data, error } = await supabase.from('utilisateurs').update({ actif }).eq('id', id).select('id, email, prenom, nom, actif').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  const { error } = await supabase.from('utilisateurs').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ message: 'Élève supprimé' })
}
