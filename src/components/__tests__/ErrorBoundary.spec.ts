import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ErrorBoundary from '../ErrorBoundary.vue'

describe('ErrorBoundary', () => {
  it('renders properly', () => {
    const wrapper = mount(ErrorBoundary, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
