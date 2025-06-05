import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Footer from '../components/Footer.vue'

describe('Footer', () => {
  it('contains newsletter section', () => {
    const wrapper = mount(Footer)
    expect(wrapper.text()).toContain('Newsletter')
  })
})
