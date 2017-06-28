class Users {
  constructor() {
    this.users = []
  }  
  addUser(id, name, room) {
    const user = {id, name, room}
    this.users.push(user)
    return user
  }
  removeUser(id) {
    const userToRemove = this.getUser(id)
    this.users = this.users.filter( (user) => user.id !== id)

    return userToRemove
  }
  getUser(id) {
    return this.users.find( user => user.id === id)
  }
  getUserList(room) {
    const users = this.users.filter( (user) => user.room == room)
    const namesArr = users.map( (user) => user.name)
    return namesArr
  }
}

module.exports = {Users}