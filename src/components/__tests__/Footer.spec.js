import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Footer, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
