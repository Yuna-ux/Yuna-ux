// libs/auth.js
import { cookies } from 'next/headers'
import supabase from '@/libs/supabase'

export async function createSession(userId) {
  const sessionToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 dias
  
  const { error } = await supabase
    .from('user_sessions')
    .insert({
      user_id: userId,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString()
    })

  if (error) throw error

  cookies().set('session_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
  })

  return sessionToken
}

export async function getCurrentUser() {
  const sessionToken = cookies().get('session_token')?.value
  if (!sessionToken) return null

  const { data, error } = await supabase
    .rpc('check_session', { session_token: sessionToken })

  if (error || !data) return null

  return data
}

export async function deleteSession() {
  const sessionToken = cookies().get('session_token')?.value
  if (!sessionToken) return

  await supabase
    .from('user_sessions')
    .delete()
    .eq('session_token', sessionToken)

  cookies().delete('session_token')
}
