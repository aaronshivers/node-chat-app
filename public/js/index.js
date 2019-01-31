const socket = io()

socket.on('connect', () => {
  console.log('Connected to server.')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server.')
})

socket.on('newMessage', (message) => {
  const { from, text } = message
  const messages = document.getElementById('messages')
  const li = document.createElement('li')
  li.textContent = `${from}: ${text}`
  messages.appendChild(li).classList.add('list-group-item')
  console.log('New Message:', message)
})

socket.on('newLocationMessage', (message) => {
  const { from, url } = message
  const messages = document.getElementById('messages')
  const li = document.createElement('li')
  const a = document.createElement('a')
  
  messages.appendChild(li).classList.add('list-group-item')

  li.innerHTML = `${ from }: <a href="${ url }">Here's my location!</a>`

  console.log('New Location Message:', message)
})

document.getElementById('message-form').addEventListener('submit', e => {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: document.getElementById('message').value
  }, () => {

  })
})

const locationButton = document.getElementById('send-location')

locationButton.addEventListener('click', e => {

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      socket.emit('createLocationMessage', latitude, longitude)
    }, () => {
      alert('Unable to fetch location.')
    })
  } else {
    return alert('Geolocation is not supported by your browser.')
  }
})
