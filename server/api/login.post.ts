import { readBody, setCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body || {}

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email et mot de passe requis',
    })
  }

  // ⚠️ À remplacer plus tard par une vraie vérification en base de données
  if (email !== 'test@example.com' || password !== 'password') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Identifiants invalides',
    })
  }

  // Simuler un token de session (ex: JWT ou clé en base)
  const token = Buffer.from(`${email}:${password}`).toString('base64')

  // Stocker le token dans un cookie sécurisé
  setCookie(event, 'token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 jour
  })

  return {
    token,
    user: { email },
  }
})