var socket = io()

socket.on('connect', function() {
  console.log('connected to server')
})

socket.on('disconnect', function() {
  console.log('disconnected from server');
})

socket.on('newMessage', function(newMessage) {
  console.log('message:', newMessage)
  var li = $('<li></li>')
  li.text(`${newMessage.from}: ${newMessage.text}`)

  $('#messages').append(li)
})

$('#message-form').on('submit', function(event) {
  event.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    message: $('[name=message]').val()
  }, function() {

  })
})