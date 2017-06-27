const express  = require('express')
const http     = require('http')
const path     = require('path')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected')

  // socket.emit from admin text welcome to chat app
  //socket.broadcast.emit from admin, text new user joined
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log(message)
    io.emit('newMessage', generateMessage(message.from, message.message))
    callback('This is from the server')
    // socket.broadcast.emit('newMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})