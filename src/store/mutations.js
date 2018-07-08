import { AUTH_ERROR, AUTH_LOGOUT, AUTH_REDIRECT, AUTH_REQUEST, AUTH_SUCCESS } from './mutationTypes'

export default {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
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
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
  }
}
