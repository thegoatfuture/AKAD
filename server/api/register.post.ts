export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email, password } = body || {}

  if (!email || !password) {
    return {
      success: false,
      error: 'Champs manquants',
    }
  }

  // Received register data can be logged with a proper logger if needed

  // TODO: Ajouter l'utilisateur à la base de données ici (MongoDB, Supabase, etc.)

  return {
    success: true,
    message: "Inscription réussie",
  }
})
