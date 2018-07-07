import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const localStorage = window.localStorage

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_REDIRECT = 'AUTH_REDIRECT'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'

export const USER_REQUEST = 'USER_REQUEST'

const USER_TOKEN_KEY = 'user-token'
const USER_ATHLETE_KEY = 'user-athlete'
const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT

let persistedAthelete = localStorage.getItem(USER_ATHLETE_KEY)
if (typeof persistedAthelete === 'string') {
  persistedAthelete = JSON.parse(persistedAthelete)
} else {
  persistedAthelete = {}
}

export default new Vuex.Store({
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getAthlete: state => state.athlete
  },
  state: {
    token: localStorage.getItem(USER_TOKEN_KEY) || '',
    status: '',
    athlete: persistedAthelete
  },
  mutations: {
    [AUTH_REQUEST]: state => {
      state.status = 'loading'
    },
    [AUTH_REDIRECT]: state => {
      state.status = 'redirecting'
    },
    [AUTH_SUCCESS]: (state, token, athlete) => {
      state.status = 'success'
      state.token = token
      state.athlete = athlete
    },
    [AUTH_LOGOUT]: (state) => {
      state.status = ''
      state.token = ''
      state.athlete = {}
    },
    [AUTH_ERROR]: state => {
      state.status = 'error'
    }
  },
  actions: {
    [AUTH_REQUEST]: ({commit, dispatch}, code) => {
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
                window.location = resp.data.redirect_url
                resolve(resp)
              }, 2000)
            }
            const token = resp.data.access_token
            if (!token) {
              throw new Error(`Invalid token response: ${token}`)
            }

            const athlete = resp.data.athlete
            console.log(`[AUTH_SUCCESS] resp.data: ${resp.data}`)

            localStorage.setItem(USER_TOKEN_KEY, token) // store the token in localstorage

            if (athlete) {
              localStorage.setItem(USER_ATHLETE_KEY, JSON.stringify(athlete))
            }
            commit(AUTH_SUCCESS, token, athlete)
            // you have your token, now log in your user :)
            // dispatch(USER_REQUEST)
            resolve(resp)
          })
          .catch(err => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem(USER_TOKEN_KEY) // if the request fails, remove any possible user token if possible
            reject(err)
          })
      })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('user-token')
        // remove the axios default header
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  }
})
