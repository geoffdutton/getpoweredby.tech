import mutations from '../mutations'
import {
  ACTIVITIES_REQUEST, ACTIVITIES_SUCCESS,
  API_ERROR,
  API_REQUEST,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_REDIRECT,
  AUTH_SUCCESS
} from '../mutationTypes'

describe('store/mutations', () => {
  let state
  beforeEach(() => {
    state = {
      token: '',
      status: 'loading',
      athlete: {},
      apiError: null,
      activities: []
    }
  })

  ;[
    [API_REQUEST, 'loading'],
    [API_ERROR, 'error'],
    [AUTH_REDIRECT, 'redirecting']
  ].forEach(([mutType, expStatus]) => {
    test(mutType, () => {
      const e = mutType === AUTH_ERROR ? 'some-error' : null
      mutations[mutType](state, e)
      expect(state).toEqual({
        token: '',
        status: expStatus,
        athlete: {},
        apiError: e,
        activities: []
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
      athlete: { id: 123, name: 'jon' },
      apiError: null,
      activities: []
    })
  })

  it('handles no athlete', () => {
    mutations[AUTH_SUCCESS](state, { token: '123' })
    expect(state).toEqual({
      token: '123',
      status: 'success',
      athlete: {},
      apiError: null,
      activities: []
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
      athlete: {},
      fullAthlete: {},
      apiError: null,
      activities: []
    })
  })

  it('clears current activities', () => {
    state.activities = ['something']
    mutations[ACTIVITIES_REQUEST](state)
    expect(state.activities).toEqual([])
  })

  it('merges existing activities on success', () => {
    const data = ['newdata']
    state.activities = ['something']
    mutations[ACTIVITIES_SUCCESS](state, data)
    expect(state.status).toBe('success')
    expect(state.activities).toEqual(['something', 'newdata'])
  })
})
