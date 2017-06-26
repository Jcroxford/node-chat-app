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

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.emit('newMessage', {
    from: 'john',
    message: 'see you then',
    createdAt: '123123'
  })

  socket.on('createMessage', (newMessage) => {
    console.log(newMessage)
    newMessage.createdAt = new Date().getTime()
  })
})

server.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})

// challenge
// newMessage 
  // should send from, text, and createdAt data
  // on client, when message is received, console log it
// createMessage 
  // client to server. server should emit newmessage to everyone else
  // client sends from, and text. server should create createdAt data