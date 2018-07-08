import mutations from '../mutations'
import { AUTH_ERROR, AUTH_LOGOUT, AUTH_REDIRECT, AUTH_REQUEST, AUTH_SUCCESS } from '../mutationTypes'

describe('store/mutations', () => {
  let state
  beforeEach(() => {
    state = {
      token: '',
      status: 'loading',
      athlete: {}
    }
  })

  ;[
    [AUTH_REQUEST, 'loading'],
    [AUTH_ERROR, 'error'],
    [AUTH_REDIRECT, 'redirecting']
  ].forEach(([mutType, expStatus]) => {
    test(mutType, () => {
      mutations[mutType](state)
      expect(state).toEqual({
        token: '',
        status: expStatus,
        athlete: {}
      })
    })
  })

  it('merges athlete', () => {
    state.athlete.id = 123
    // this needs to be the same object in memory, otherwise vue won't react to it
    const athBefore = state.athlete
    mutations[AUTH_SUCCESS](state, { token: '123', athlete: { name: 'jon' } })
    expect(state.athlete).toBe(athBefore)
    expect(state).toEqual({
      token: '123',
      status: 'success',
      athlete: { id: 123, name: 'jon' }
    })
  })

  it('handles no athlete', () => {
    mutations[AUTH_SUCCESS](state, { token: '123' })
    expect(state).toEqual({
      token: '123',
      status: 'success',
      athlete: {}
    })
  })

  it('clears everything at logout', () => {
    state.athlete.id = 123
    state.token = '333'
    state.status = 'success'
    mutations[AUTH_LOGOUT](state)
    expect(state).toEqual({
      token: '',
      status: '',
      athlete: {}
    })
  })
})
