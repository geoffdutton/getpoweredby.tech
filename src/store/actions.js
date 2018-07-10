import axios from 'axios'
import { STORE_KEYS, API_ENDPOINT } from './constants'
import {
  API_ERROR, API_REQUEST,
  AUTH_LOGOUT,
  AUTH_REDIRECT,
  AUTH_SUCCESS,
  ME_SUCCESS,
  ME_REQUEST,
  AUTH_REQUEST, ACTIVITIES_REQUEST, ACTIVITIES_SUCCESS
} from './mutationTypes'

const utils = require('../utils').default

const localStorage = window.localStorage

const logout = () => {
  Object.keys(STORE_KEYS).forEach(k => localStorage.removeItem(STORE_KEYS[k]))
  // remove the axios default header
  delete axios.defaults.headers.common['X-Strava-Auth']
}

export default {
  [AUTH_REQUEST]: ({ commit, dispatch }, code) => {
    commit(API_REQUEST)
    console.log(`[AUTH_REQUEST] code: ${code}`)
    let url = '/auth/'
    if (code) {
      url += `?code=${encodeURIComponent(code)}`
    }
    return axios({
      url: `${API_ENDPOINT}${url}`
    })
      .then(resp => {
        // the api endpoint needs to be changed to normalize the response
        const data = resp.data.body || resp.data
        if (data.redirect_url) {
          commit(AUTH_REDIRECT)
          return utils.promiseDely(279).then(() => {
            utils.redirect(resp.data.redirect_url)
            return resp
          })
        }
        const token = data.access_token
        if (!token) {
          throw new Error(`Invalid token response: ${token}`)
        }

        axios.defaults.headers.common['X-Strava-Auth'] = token

        const athlete = data.athlete && utils.camelCaseObjectKeys(data.athlete)
        console.log(`[AUTH_SUCCESS] resp.data:`, resp.data)

        localStorage.setItem(STORE_KEYS.TOKEN, token) // store the token in localstorage

        if (athlete) {
          localStorage.setItem(STORE_KEYS.ATHLETE, JSON.stringify(athlete))
        }
        commit(AUTH_SUCCESS, { token, athlete })
        // you have your token, now log in your user :)
        dispatch(ME_REQUEST)
        return resp
      })
      .catch(err => {
        logout()
        commit(API_ERROR, err)
        throw err
      })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      logout()
      commit(AUTH_LOGOUT)
      resolve()
    })
  },

  [ME_REQUEST]: ({ commit }) => {
    commit(API_REQUEST)
    let url = '/me/'

    return axios({
      url: `${API_ENDPOINT}${url}`
    })
      .then(resp => {
        // the api endpoint needs to be changed to normalize the response
        const data = utils.camelCaseObjectKeys(resp.data.body || resp.data)

        console.log(`[ME_SUCCESS] data:`, data)
        if (data) {
          localStorage.setItem(STORE_KEYS.FULL_ATHLETE, JSON.stringify(data))
        }

        commit(ME_SUCCESS, data)
        return data
      })
      .catch(err => {
        commit(API_ERROR, err)
      })
  },

  [ACTIVITIES_REQUEST]: ({ commit }) => {
    commit(ACTIVITIES_REQUEST)
    let url = '/activities/'

    return axios({
      url: `${API_ENDPOINT}${url}`
    })
      .then(resp => {
        // the api endpoint needs to be changed to normalize the response
        const data = utils.camelCaseObjectKeys(resp.data.body || resp.data)
        if (data) {
          localStorage.setItem(STORE_KEYS.ACTIVITIES, JSON.stringify(data))
        }

        commit(ACTIVITIES_SUCCESS, data)
        return data
      })
      .catch(err => {
        commit(API_ERROR, err)
      })
  }
}
