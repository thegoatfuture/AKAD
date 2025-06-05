import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'

vi.mock('h3', async () => {
  const actual = await vi.importActual<typeof import('h3')>('h3')
  return { ...actual, readBody: vi.fn() }
})

let handler: any
let readBody: any
let globalReadBody: any

beforeAll(async () => {
  ;(global as any).defineEventHandler = (fn: any) => fn
  ;(global as any).readBody = vi.fn()
  globalReadBody = (global as any).readBody
  const mod = await import('../server/api/register.post')
  handler = mod.default
  ;({ readBody } = await import('h3'))
})

describe('register API', () => {
  beforeEach(() => {
    ;(readBody as unknown as vi.Mock).mockResolvedValue({ email: 'a', password: 'b' })
    ;(globalReadBody as vi.Mock).mockResolvedValue({ email: 'a', password: 'b' })
  })

  it('returns success true', async () => {
    const res = await handler({} as any)
    expect(res).toEqual({ success: true })
    expect(globalReadBody).toHaveBeenCalled()
  })
})
