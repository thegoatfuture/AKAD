import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

const loginMock = vi.fn()
vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({ login: loginMock }),
}))

describe('Login Page navigation', () => {
  it('redirects to dashboard after login', async () => {
    const navigateTo = vi.fn()
    vi.stubGlobal('navigateTo', navigateTo)
    const { default: Login } = await import('../pages/login.vue')
    const wrapper = mount(Login, {
      global: { stubs: { NuxtLink: { template: '<a><slot /></a>' } } },
    })
    await (wrapper.vm as any).handleLogin()
    expect(loginMock).toHaveBeenCalled()
    expect(navigateTo).toHaveBeenCalledWith('/dashboard')
    vi.unstubAllGlobals()
  })
})
