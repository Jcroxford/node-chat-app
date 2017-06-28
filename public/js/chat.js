var socket = io()

function scrollToBottom() {
  // selectors
  var messages   = $('#messages')
  var newMessage = messages.children('li:last-child')

  //heights
  var clientHeight      = messages.prop('clientHeight')
  var scrollHeight      = messages.prop('scrollHeight')
  var scrollTop         = messages.prop('scrollTop')
  var newMessageHeight  = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function() {
  var params = $.deparam(window.location.search)

  socket.emit('join', params, function(err) {
    if(err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('no error')
    }
  })
})

socket.on('disconnect', function() {
  console.log('disconnected from server');
})

socket.on('updateUserList', function(users) {
  var ol = $('<ol></ol>')

  users.forEach(function(user) {
    ol.append($('<li></li>').text(user))
  })

  $('#users').html(ol)
})

socket.on('newMessage', function(newMessage) {
  var formattedTime = moment(newMessage.createdAt).format('h:mm a')
  var template = $('#message-template').html()
  var html = Mustache.render(template, {
    text: newMessage.text,
    from: newMessage.from,
    createdAt: formattedTime
  })

  $('#messages').append(html)
  scrollToBottom()

  // old way to render message output using jquery
  // var li = $('<li></li>')
  // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`)

  // $('#messages').append(li)
})

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  var template = $('#location-message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })

  $('#messages').append(html)
  scrollToBottom()

  // old way to render message output using jquery
  // var li = $('<li></li>')
  // var a = $('<a target="_blank">My Current Location</a>')

  // li.text(`${message.from} ${formattedTime}: `)
  // a.attr('href', message.url)
  // li.append(a)
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