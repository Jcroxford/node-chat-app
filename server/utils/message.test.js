const expect = require('expect')

const {generateMessage} = require('./message')

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