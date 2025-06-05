export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body as { email?: string; password?: string }

  console.log('Received register data:', email)

  // TODO: insert user into database if configured

  return { success: true }
})
