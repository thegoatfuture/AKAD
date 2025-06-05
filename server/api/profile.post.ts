import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Received profile data:', body)
  return { success: true }
})
