import {
  ACTIVITIES_REQUEST,
  ACTIVITIES_SUCCESS,
  API_ERROR, API_REQUEST,
  AUTH_LOGOUT,
  AUTH_REDIRECT,
  AUTH_SUCCESS,
  ME_SUCCESS
} from './mutationTypes'

export default {
  [AUTH_REDIRECT]: state => {
    state.status = 'redirecting'
  },
  [AUTH_SUCCESS]: (state, { token, athlete }) => {
    state.status = 'success'
    state.token = token
    if (athlete) {
      Object.assign(state.athlete, athlete)
    }
  },
  [AUTH_LOGOUT]: (state) => {
    state.status = ''
    state.token = ''
    state.athlete = {}
    state.fullAthlete = {}
    state.apiError = null
  },

  [ACTIVITIES_REQUEST]: state => {
    state.activities = []
    state.status = 'loading'
    state.apiError = null
  },
  [ACTIVITIES_SUCCESS]: (state, payload) => {
    state.status = 'success'
    state.activities = [...state.activities, ...payload]
  },

  [ME_SUCCESS]: (state, payload) => {
    state.status = 'success'
    Object.assign(state.fullAthlete, payload)
  },

  [API_ERROR]: (state, payload) => {
    state.status = 'error'
    state.apiError = payload
  },
  [API_REQUEST]: state => {
    state.status = 'loading'
    state.apiError = null
  }
}
