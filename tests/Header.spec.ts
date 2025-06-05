import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Header from '../components/Header.vue'

describe('Header', () => {
  it('renders navigation links', () => {
    const wrapper = mount(Header, {
      global: { stubs: { NuxtLink: { template: '<a><slot /></a>' } } },
    })
    expect(wrapper.text()).toContain('Accueil')
    expect(wrapper.text()).toContain('Challenge')
    expect(wrapper.text()).toContain('Connexion')
  })
})
