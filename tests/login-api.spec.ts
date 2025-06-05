import { describe, it, beforeAll, beforeEach, expect, vi } from 'vitest'

vi.mock('h3', async () => {
  const actual = await vi.importActual<typeof import('h3')>('h3')
  return { ...actual, readBody: vi.fn(), setCookie: vi.fn() }
})

let handler: any
let readBody: any

beforeAll(async () => {
  ;(global as any).defineEventHandler = (fn: any) => fn
  ;(global as any).readBody = vi.fn()
  const mod = await import('../server/api/login.post')
  handler = mod.default
  ;({ readBody } = await import('h3'))
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
    expect(res.token).toBeTruthy()
    expect(res.user).toEqual({ email: 'test@example.com' })
  })

  it('returns error for invalid credentials', async () => {
    (readBody as vi.Mock).mockResolvedValue({
      email: 'bad@example.com',
      password: 'wrong',
    })
    await expect(handler({} as any)).rejects.toBeTruthy()
  })
})
