import { shallowMount } from '@vue/test-utils'
import Activity from '@/components/Activity.vue'

describe('Activity.vue', () => {
  it('renders name and time when passed', () => {
    const msg = 'Activity Name Distance: 0.08 miles Time: 30m'
    const wrapper = shallowMount(Activity, {
      propsData: { name: 'Activity Name', distance: 123, movingTime: 30 * 60 }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
