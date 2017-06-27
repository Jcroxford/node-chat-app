var socket = io()

socket.on('connect', function() {
  console.log('connected to server')
})

socket.on('disconnect', function() {
  console.log('disconnected from server');
})

socket.on('newMessage', function(newMessage) {
  const formattedTime = moment(newMessage.createdAt).format('h:mm a')
  var li = $('<li></li>')
  li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`)

  $('#messages').append(li)
})

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  var li = $('<li></li>')
  var a = $('<a target="_blank">My Current Location</a>')

  li.text(`${message.from} ${formattedTime}: `)
  a.attr('href', message.url)
  li.append(a)
  $('#messages').append(li)
})

$('#message-form').on('submit', function(event) {
  event.preventDefault()

  var messageTextbox = $('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    message: messageTextbox.val()
  }, function() {
    messageTextbox.val('')
  })
})

var locationButton = $('#send-location')
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr('disabled').text('Send location')
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }, 
    function() {
      locationButton.removeAttr('disabled').text('Send location')
      alert('Unable to fetch location')
    }
  )
})