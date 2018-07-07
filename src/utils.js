module.exports = {
  urlSafeBtoa (obj) {
    if (typeof obj === 'undefined') {
      return ''
    }
    return encodeURIComponent(btoa(JSON.stringify(obj)))
  }
}
