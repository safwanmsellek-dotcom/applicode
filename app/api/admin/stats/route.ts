// app/api/admin/stats/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { requireAdmin } from '@/lib/auth'

// GET /api/admin/stats — statistiques globales (admin)
export async function GET(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })

  // Nombre d'élèves
  const { count: totalEleves } = await supabase
    .from('utilisateurs')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'eleve')

  // Élèves actifs
  const { count: elevesActifs } = await supabase
    .from('utilisateurs')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'eleve')
    .eq('actif', true)

  // Nombre de questions
  const { count: totalQuestions } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true })

  // Nombre de thèmes
  const { count: totalThemes } = await supabase
    .from('themes')
    .select('*', { count: 'exact', head: true })

  // Nombre de séries jouées (tous modes)
  const { count: totalResultats } = await supabase
    .from('resultats')
    .select('*', { count: 'exact', head: true })

  // Questions par thème
  const { data: parTheme } = await supabase
    .from('questions')
    .select('themes ( nom )')

  const themeCount: Record<string, number> = {}
  parTheme?.forEach((q: any) => {
    const nom = q.themes?.nom || 'Sans thème'
    themeCount[nom] = (themeCount[nom] || 0) + 1
  })

  return NextResponse.json({
    totalEleves,
    elevesActifs,
    totalQuestions,
    totalThemes,
    totalResultats,
    parTheme: themeCount,
  })
}
