import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import { STORE_KEYS } from './constants'
import axios from 'axios/index'
import utils from '../utils'

Vue.use(Vuex)

const localStorage = window.localStorage

const accessToken = localStorage.getItem(STORE_KEYS.TOKEN)
if (accessToken) {
  axios.defaults.headers.common['X-Strava-Auth'] = accessToken
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    isApiLoading: state => state.status === 'loading',
    getApiError: state => state.apiError,
    getAthlete: state => {
      const a = state.athlete
      if (typeof a === 'string') {
        return JSON.parse(a)
      }
      return a
    },
    getActivities: state => state.activities
  },
  state: {
    token: localStorage.getItem(STORE_KEYS.TOKEN) || '',
    status: '',
    athlete: utils.camelCaseObjectKeys(JSON.parse(localStorage.getItem(STORE_KEYS.ATHLETE) || '{}')),
    activities: [],
    apiError: null
  },
  mutations,
  actions
})
