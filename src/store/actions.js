import axios from 'axios'
import utils from '../utils'
import { STORE_KEYS, API_ENDPOINT } from './constants'
import { AUTH_ERROR, AUTH_LOGOUT, AUTH_REDIRECT, AUTH_REQUEST, AUTH_SUCCESS } from './mutationTypes'
const localStorage = window.localStorage

const logout = () => {
  Object.keys(STORE_KEYS).forEach(k => localStorage.removeItem(STORE_KEYS[k]))
  // remove the axios default header
  delete axios.defaults.headers.common['Authorization']
}

export default {
  [AUTH_REQUEST]: ({ commit, dispatch }, code) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit(AUTH_REQUEST)
      console.log(`[AUTH_REQUEST] code: ${code}`)
      let url = '/auth/'
      if (code) {
        url += `?code=${encodeURIComponent(code)}`
      }
      axios({
        url: `${API_ENDPOINT}${url}`
      })
        .then(resp => {
          if (resp.data.redirect_url) {
            commit(AUTH_REDIRECT)
            return setTimeout(() => {
              utils.redirect(resp.data.redirect_url)
              resolve(resp)
            }, 278)
          }
          const token = resp.data.access_token
          if (!token) {
            throw new Error(`Invalid token response: ${token}`)
          }

          const athlete = resp.data.athlete
          console.log(`[AUTH_SUCCESS] resp.data:`, resp.data)

          localStorage.setItem(STORE_KEYS.TOKEN, token) // store the token in localstorage

          if (athlete) {
            localStorage.setItem(STORE_KEYS.ATHLETE, JSON.stringify(athlete))
          }
          commit(AUTH_SUCCESS, { token, athlete })
          // you have your token, now log in your user :)
          // dispatch(USER_REQUEST)
          resolve(resp)
        })
        .catch(err => {
          logout()
          commit(AUTH_ERROR, err)
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      logout()
      commit(AUTH_LOGOUT)
      resolve()
    })
  }
}
