import utils from '../utils'

describe('utils', () => {
  it('converts underscore keys to camelcase', () => {
    expect(utils.camelCaseObjectKeys({
      camel_case_me: '123',
      alreadyDone: true,
      _id_with_more: 2
    })).toEqual({
      camelCaseMe: '123',
      alreadyDone: true,
      _idWithMore: 2
    })
  })

  it('converts array of objects with underscore keys to camelcase', () => {
    expect(utils.camelCaseObjectKeys([
      {
        _id: 1,
        camel_case_me: '123',
        alreadyDone: true
      },
      {
        id_: 2,
        camel_case_me: '123',
        alreadyDone: true
      }
    ])).toEqual([
      {
        _id: 1,
        camelCaseMe: '123',
        alreadyDone: true
      },
      {
        id_: 2,
        camelCaseMe: '123',
        alreadyDone: true
      }
    ])
  })

  it('converts underscore keys to camelcase with nested obejcts', () => {
    const input = {
      camel_case_me: '123',
      alreadyDone: null,
      false_me: false,
      veryTrue: true,
      nested_obj: {
        get_me: 'too',
        false_me: false,
        very_true: true
      }
    }
    expect(utils.camelCaseObjectKeys(input)).toEqual({
      camelCaseMe: '123',
      alreadyDone: null,
      falseMe: false,
      veryTrue: true,
      nestedObj: {
        getMe: 'too',
        falseMe: false,
        veryTrue: true
      }
    })
  })
})
