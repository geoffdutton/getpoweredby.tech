module.exports = {
  urlSafeBtoa (obj) {
    if (typeof obj === 'undefined') {
      return ''
    }
    return encodeURIComponent(window.btoa(JSON.stringify(obj)))
  },
  redirect (url) {
    window.location = url
  }
}
