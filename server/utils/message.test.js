const expect = require('expect')

const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct emssage object', () => {
    const from = 'test'
    const text = 'some text to test with'
    
    const message = generateMessage(from, text)

    // expect(message.from).toBe(from)
    // expect(message.text).toBe(text)
    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from, text})
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'test'
    const latitude = 1
    const longitude = 1
    const url = 'https://www.google.com/maps?q=1,1'

    const message = generateLocationMessage(from, latitude, longitude)

    expect(message).toInclude({from, url})
    expect(message.createdAt).toBeA('number')
    expect(message.url).toBe(url)
  })
})