const expect = require('expect')

const {Users} = require('./users')


describe('Users', () => {
  beforeEach(() => {
    users = new Users()
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'the chat room'
      },
      {
        id: '2',
        name: 'John',
        room: 'the no chat room'
      },
      {
        id: '3',
        name: 'Sally',
        room: 'the chat room'
      }
    ]
  })

  it('should add new user', () => {
    let users = new Users()
    const user = {
      id: '123',
      name: 'Jesse',
      room: 'The Office Fans'
    }
    let resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should return names for \' the chat room\'', () => {
    const userList = users.getUserList('the chat room')

    expect(userList).toEqual(['Mike', 'Sally'])
  })
  
  it('should return names for \' the no chat room\'', () => {
    const userList = users.getUserList('the no chat room')

    expect(userList).toEqual(['John'])
  })

  it('should remove a user', () => {
    const id = '1'
    const expectedArraySize = users.users.length - 1
    const removedUser = users.removeUser(id)

    expect(removedUser).toEqual({id: '1', name: 'Mike', room: 'the chat room'})
    expect(users.users.length).toBe(expectedArraySize)
  })

  it('should not remove a user', () => {
    // try to remove an id that does not exist
    const id = 'not a valid id'
    const expectedArraySize = users.users.length
    const removedUser = users.removeUser(id)

    expect(removedUser).toNotExist()
    expect(users.users.length).toBe(expectedArraySize)
  })

  it('should find user', () => {
    const id = '1'
    const foundUser = users.getUser(id)

    expect(foundUser).toEqual({id: '1', name: 'Mike', room: 'the chat room'})
  })

  it('should not find user', () => {
    const id = 'not a valid id'
    const foundUser = users.getUser(id)

    expect(foundUser).toNotExist()
  })
})