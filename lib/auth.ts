// lib/auth.ts
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const SECRET = process.env.JWT_SECRET!

export interface TokenPayload {
  userId: string
  email: string
  role: 'eleve' | 'admin'
}

// Créer un token JWT (valable 7 jours)
export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

// Vérifier et décoder un token
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, SECRET) as TokenPayload
  } catch {
    return null
  }
}

// Extraire l'utilisateur depuis une requête Next.js
export function getUserFromRequest(req: NextRequest): TokenPayload | null {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  const token = authHeader.split(' ')[1]
  return verifyToken(token)
}

// Vérifier que l'utilisateur est admin
export function requireAdmin(req: NextRequest): TokenPayload | null {
  const user = getUserFromRequest(req)
  if (!user || user.role !== 'admin') return null
  return user
}
