// Thanks: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
function padStart (str, targetLength, padString) {
  str = String(str)
  targetLength = targetLength >> 0 // truncate if number or convert non-number to 0;
  padString = String((typeof padString !== 'undefined' ? padString : ' '))
  if (str.length > targetLength) {
    return str
  } else {
    targetLength = targetLength - str.length
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length) // append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + str
  }
}

function padTwoZeros (str) {
  return padStart(str, 2, '0')
}

function camelCaseObjectKeys (obj) {
  if (Array.isArray(obj)) {
    return obj.map(camelCaseObjectKeys)
  }
  const keys = Object.keys(obj)
  return keys.reduce((accm, key) => {
    let val = obj[key]
    if (val && typeof val === 'object') {
      val = camelCaseObjectKeys(val)
    }

    const keyStartsWithUnderscore = key.indexOf('_') === 0
    let firstRound = false
    const newKey = key.replace(/_([a-z])/g, g => {
      if (!firstRound) {
        firstRound = true
        if (keyStartsWithUnderscore && g[0] === '_') {
          return g
        }
      }
      return g[1].toUpperCase()
    })
    accm[newKey] = val
    return accm
  }, {})
}

export default {
  urlSafeBtoa (obj) {
    if (typeof obj === 'undefined') {
      return ''
    }
    return encodeURIComponent(window.btoa(JSON.stringify(obj)))
  },
  redirect (url) {
    window.location = url
  },
  promiseDely (delay) {
    return new Promise(resolve => setTimeout(resolve, delay))
  },
  camelCaseObjectKeys,
  filterSecondsToHuman (seconds) {
    let hourStr = ''
    const hours = Math.floor(seconds / (60 * 60) % 60)
    const minutes = padTwoZeros(Math.floor(seconds / 60 % 60))

    if (hours) {
      hourStr = `${padTwoZeros(hours)}h `
    }

    return `${hourStr}${padTwoZeros(minutes)}m`
  }
}
