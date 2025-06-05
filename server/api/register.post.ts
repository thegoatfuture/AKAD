export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email, password } = body || {}

  if (!email || !password) {
    return {
      success: false,
      error: 'Champs manquants',
    }
  }

  console.log('Received register data:', email)

  // TODO: Ajouter l'utilisateur à la base de données ici (MongoDB, Supabase, etc.)

  return {
    success: true,
    message: "Inscription réussie",
  }
})