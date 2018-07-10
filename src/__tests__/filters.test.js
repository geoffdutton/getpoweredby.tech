import utils from '../utils'
import filters from '../filters'

describe('filter setup', () => {
  let VueFilter

  beforeEach(() => {
    VueFilter = jest.fn()
  })

  it('adds filters defined in utils.js', () => {
    filters({ filter: VueFilter })
    expect(VueFilter).toHaveBeenCalledTimes(2)
    expect(VueFilter).toHaveBeenCalledWith('secondsToHuman', utils.filterSecondsToHuman)
    expect(VueFilter).toHaveBeenCalledWith('metersToMiles', utils.filterMetersToMiles)
  })

  it('converts seconds to something readable', () => {
    const fn = utils.filterSecondsToHuman
    expect(fn(1800)).toBe('30m')
    expect(fn(300 + (60 * 60))).toBe('01h 05m')
  })
})
