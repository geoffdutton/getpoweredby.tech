const utils = require('./utils').default

export default function (Vue) {
  return Object.keys(utils).forEach(key => {
    if (key.indexOf('filter') === 0) {
      let filterName = key.replace('filter', '')
      filterName = filterName[0].toLowerCase() + filterName.slice(1)
      Vue.filter(filterName, utils[key])
    }
  })
}
