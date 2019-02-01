const expect = require('expect')

const { isRealString } = require('./validation')

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const string = 123432
    const res = isRealString(string)
    
    expect(res).toBe(false)
  })

  it('should reject string with only spaces', () => {
    const string = '       '
    const res = isRealString(string)
    
    expect(res).toBe(false)
  })

  it('should allow strings with non-space characters', () => {
    const string = 'sfdASDF1234!@#%$'
    const res = isRealString(string)
    
    expect(res).toBe(true)
  })
})
