import utils from '../../utils'
import actions from '../actions'
import { STORE_KEYS } from '../constants'
import {
  AUTH_LOGOUT, AUTH_REDIRECT, AUTH_REQUEST, AUTH_SUCCESS
} from '../mutationTypes'
import axios from 'axios'
jest.mock('axios')

describe('store/actions', () => {
  const stravaRedirectUrl = 'https://strava.com/auth/whatever'
  let actionSpies

  beforeEach(() => {
    utils.redirect = jest.fn()
    jest.useFakeTimers()
    actionSpies = {
      commit: jest.fn(),
      dispatch: jest.fn()
    }
  })

  it('clears localstorage keys', () => {
    return actions[AUTH_LOGOUT]({ commit: ct => {
      Object.keys(STORE_KEYS).forEach(k => {
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(STORE_KEYS[k])
      })
      expect(ct).toBe(AUTH_LOGOUT)
    }})
  })

  describe(AUTH_REQUEST, () => {
    it('redirects to auth page', async () => {
      axios.__mockResponse = { data: { redirect_url: stravaRedirectUrl } }
      const prom = actions[AUTH_REQUEST](actionSpies).then(res => {
        expect(res).toBeTruthy()
        expect(axios).toHaveBeenCalledWith({
          url: 'test-api.endpoint/auth/'
        })
        expect(utils.redirect).toHaveBeenCalledWith(stravaRedirectUrl)
        expect(actionSpies.commit).toHaveBeenCalledWith(AUTH_REDIRECT)
        expect(window.localStorage.setItem).not.toHaveBeenCalled()
      })

      process.nextTick(() => jest.runAllTimers())
      return prom
    })

    it('stores token and athlete', () => {
      const token = 'some-token'
      const ath = { name: 'blah' }
      axios.__mockResponse = { data: { access_token: token, athlete: ath } }
      return actions[AUTH_REQUEST](actionSpies, 'my-code').then(res => {
        expect(res).toBeTruthy()
        expect(axios).toHaveBeenCalledWith({
          url: `test-api.endpoint/auth/?code=my-code`
        })
        expect(utils.redirect).not.toHaveBeenCalled()
        expect(actionSpies.commit).toHaveBeenCalledWith(AUTH_SUCCESS, { token, athlete: ath })
        expect(window.localStorage.setItem).toHaveBeenCalledWith(STORE_KEYS.TOKEN, token)
        expect(window.localStorage.setItem).toHaveBeenCalledWith(STORE_KEYS.ATHLETE, JSON.stringify(ath))
        expect(axios.defaults.headers.common['X-Strava-Auth']).toBe(token)
      })
    })
  })
})
