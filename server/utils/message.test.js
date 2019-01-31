const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Bob'
    const text = 'Hello Everybody'
    const message = generateMessage(from, text)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({ from, text })
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Bob'
    const latitude = 37.09024
    const longitude = -95.712891
    const url = `https://www.google.com/maps/search/?api=1&query=${ latitude },${ longitude }`
    const message = generateLocationMessage(from, url)
    
    expect(message).toMatchObject({ from, url })
  })
})
