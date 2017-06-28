const express  = require('express')
const http     = require('http')
const path     = require('path')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString}                             = require('./utils/validation')
const {Users}                                    = require('./utils/users')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)
const io = socketIO(server)
let   users = new Users()

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.on('join', (params, callback) => {
    if(!isRealString(params.room) || !isRealString(params.name)) {
      return callback('Name and Room Name are required')
    }
    
    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

    return callback()
  })


  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id)

    if(user && isRealString(message.message)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.message))
    }

    callback()
    // socket.broadcast.emit('newMessage', message)
  })

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id)

    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  })

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id)

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
    }
  })
})

server.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})