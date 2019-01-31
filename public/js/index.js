const socket = io()

socket.on('connect', () => {
  console.log('Connected to server.')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server.')
})

socket.on('newMessage', (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const { from, text } = message
  const messages = document.getElementById('messages')
  const li = document.createElement('li')
  li.textContent = `${ from } ${ formattedTime }: ${ text }`
  messages.appendChild(li).classList.add('list-group-item')
  console.log('New Message:', message)
})

socket.on('newLocationMessage', (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const { from, url } = message
  const messages = document.getElementById('messages')
  const li = document.createElement('li')
  const a = document.createElement('a')
  
  messages.appendChild(li).classList.add('list-group-item')

  li.innerHTML = `${ from } ${ formattedTime }: <a href="${ url }">Here's my location!</a>`

  console.log('New Location Message:', message)
})

document.getElementById('message-form').addEventListener('submit', e => {
  e.preventDefault()
  const messageTextBox = document.getElementById('message')

  socket.emit('createMessage', {
    from: 'User',
    text: message.value
  }, () => {
    messageTextBox.value = ''
  })
})

const locationButton = document.getElementById('send-location')


locationButton.addEventListener('click', e => {
  const enableLocationButton = () => {
    setTimeout(() => {
      locationButton.disabled = false
      locationButton.textContent = 'Send Location'
    }, 10000)
  }

  if ('geolocation' in navigator) {
    locationButton.disabled = true
    locationButton.textContent = 'Sending Location...'

    navigator.geolocation.getCurrentPosition(position => {
      enableLocationButton()
      const { latitude, longitude } = position.coords
      socket.emit('createLocationMessage', latitude, longitude)
    }, () => {
      enableLocationButton()
      alert('Unable to fetch location.')
    })
  } else {
    return alert('Geolocation is not supported by your browser.')
  }
})
