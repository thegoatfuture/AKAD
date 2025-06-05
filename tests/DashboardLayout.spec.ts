import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import DashboardLayout from '../components/DashboardLayout.vue'

describe('DashboardLayout', () => {
  it('renders sidebar and main heading', () => {
    const wrapper = mount(DashboardLayout)
    expect(wrapper.text()).toContain('AKAD Dashboard')
    expect(wrapper.text()).toContain('Aperçu des comptes')
  })
})
