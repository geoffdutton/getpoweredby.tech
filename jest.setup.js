if (!process.env.__JEST_UNHANDLED_REJECTED_SET) {
  process.env.__JEST_UNHANDLED_REJECTED_SET = 'true'
  process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error)
    process.exit(-1)
  })
}

process.env.VUE_APP_API_ENDPOINT = 'test-api.endpoint'

require('jest-localstorage-mock')

const utils = require('./src/utils')
utils.redirect = jest.fn()
