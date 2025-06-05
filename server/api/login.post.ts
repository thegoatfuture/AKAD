export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (body?.email === 'test@example.com' && body?.password === 'password') {
    return { token: 'dummy-token' }
  }
  return { error: 'Invalid credentials' }
})
