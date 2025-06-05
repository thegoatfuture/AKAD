import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
const createMock = vi.fn().mockResolvedValue({ url: 'https://checkout.test' })
vi.mock('stripe', () => ({
  default: class {
    checkout = { sessions: { create: createMock } }
  },
}))

vi.mock('h3', async () => {
  const actual = await vi.importActual<typeof import('h3')>('h3')
  return { ...actual, readBody: vi.fn() }
})

let handler: any
let readBody: any
beforeAll(async () => {
  // nuxt provides this helper globally; for tests we mock it
  ;(global as any).defineEventHandler = (fn: any) => fn
  ;(global as any).readBody = vi.fn()
  const mod = await import('../server/api/create-checkout-session.post')
  handler = mod.default
  ;({ readBody } = await import('h3'))
})

describe('create-checkout-session API', () => {
  beforeEach(() => {
    createMock.mockClear()
    ;(readBody as unknown as vi.Mock).mockResolvedValue({})
  })

  it('returns checkout url', async () => {
    const url = await handler({} as any)
    expect(url).toEqual({ url: 'https://checkout.test' })
    expect(createMock).toHaveBeenCalled()
  })
})
