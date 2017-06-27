const express  = require('express')
const http     = require('http')
const path     = require('path')
const socketIO = require('socket.io')

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
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat'
  })
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User joined the chat'
  })

  socket.on('createMessage', (newMessage) => {
    console.log(newMessage)
    newMessage.createdAt = new Date().getTime()
    io.emit('newMessage', newMessage)
    // socket.broadcast.emit('newMessage', newMessage)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})