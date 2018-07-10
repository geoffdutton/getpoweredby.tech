const utils = require('./utils').default

export default function (Vue) {
  Vue.filter('round', (value, decimals) => {
    if (typeof value !== 'number') {
      return value
    }
    if (!value) {
      value = 0
    }

    if (!decimals) {
      decimals = 0
    }

    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  })
  return Object.keys(utils).forEach(key => {
    if (key.indexOf('filter') === 0) {
      let filterName = key.replace('filter', '')
      filterName = filterName[0].toLowerCase() + filterName.slice(1)
      Vue.filter(filterName, utils[key])
    }
  })
}
