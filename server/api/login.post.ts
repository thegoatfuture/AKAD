import { readBody, setCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body || {}

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email et mot de passe requis' })
  }

  // Simple auth check - replace with real logic
  if (password !== 'password') {
    throw createError({ statusCode: 401, statusMessage: 'Identifiants invalides' })
  }

  const token = Buffer.from(`${email}:${password}`).toString('base64')
  setCookie(event, 'token', token, { httpOnly: true, path: '/' })
  return { token, user: { email } }
})
