export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body?.email || !body?.password) {
    return { error: 'Missing fields' }
  }
  return { success: true }
})
