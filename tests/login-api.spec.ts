import { describe, it, beforeAll, beforeEach, expect, vi } from 'vitest'

let handler: any
let readBody: any

beforeAll(async () => {
  ;(global as any).defineEventHandler = (fn: any) => fn
  ;(global as any).readBody = vi.fn()
  const mod = await import('../server/api/login.post')
  handler = mod.default
  readBody = (global as any).readBody
})

describe('POST /api/login', () => {
  beforeEach(() => {
    (readBody as vi.Mock).mockReset()
  })

  it('returns token for valid credentials', async () => {
    (readBody as vi.Mock).mockResolvedValue({
      email: 'test@example.com',
      password: 'password',
    })
    const res = await handler({} as any)
    expect(res).toEqual({ token: 'dummy-token' })
  })

  it('returns error for invalid credentials', async () => {
    (readBody as vi.Mock).mockResolvedValue({
      email: 'bad@example.com',
      password: 'wrong',
    })
    const res = await handler({} as any)
    expect(res).toEqual({ error: 'Invalid credentials' })
  })
})
