import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import { STORE_KEYS } from './constants'

Vue.use(Vuex)

const localStorage = window.localStorage

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getAthlete: state => {
      const a = state.athlete
      if (typeof a === 'string') {
        return JSON.parse(a)
      }
      return a
    }
  },
  state: {
    token: localStorage.getItem(STORE_KEYS.TOKEN) || '',
    status: '',
    athlete: JSON.parse(localStorage.getItem(STORE_KEYS.ATHLETE) || '{}')
  },
  mutations,
  actions
})
