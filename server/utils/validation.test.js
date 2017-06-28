const expect = require('expect')

const {isRealString} = require('./validation')

describe('isRealString', () => {
  it('should reject non string value', () => {
    const nonStringValue = 33
    const result = isRealString(nonStringValue)

    expect(result).toBe(false)
  })

  it('should reject strings with only spaces', () => {
    const whiteSpace = '   '
    const result = isRealString(whiteSpace)

    expect(result).toBe(false)
  })

  it('should allow strings with non space characters', () => {
    const realString = '  real test string that should pass  '
    const result = isRealString(realString)

    expect(result).toBe(true)
  })
})