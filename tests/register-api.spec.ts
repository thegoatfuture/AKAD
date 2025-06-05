import { describe, it, beforeAll, beforeEach, expect, vi } from 'vitest'

let handler: any
let readBody: any

beforeAll(async () => {
  ;(global as any).defineEventHandler = (fn: any) => fn
  ;(global as any).readBody = vi.fn()
  const mod = await import('../server/api/register.post')
  handler = mod.default
  readBody = (global as any).readBody
})

describe('POST /api/register', () => {
  beforeEach(() => {
    (readBody as vi.Mock).mockReset()
  })

  it('returns success for valid payload', async () => {
    (readBody as vi.Mock).mockResolvedValue({
      email: 'a@b.com',
      password: 'pass',
    })
    const res = await handler({} as any)
    expect(res).toEqual({ success: true, message: 'Inscription réussie' })
  })

  it('returns error for missing fields', async () => {
    (readBody as vi.Mock).mockResolvedValue({})
    const res = await handler({} as any)
    expect(res).toEqual({ success: false, error: 'Champs manquants' })
  })
})
