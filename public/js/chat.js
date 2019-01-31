const socket = io()

const scrollToBottom = () => {
  // Selectors
  const messages = document.getElementById('message-list')
  const newMessage = messages.lastChild

  // Heights
  const clientHeight = messages.clientHeight
  const scrollTop = messages.scrollTop
  const scrollHeight = messages.scrollHeight
  const newMessageHeight = newMessage.clientHeight
  
  if (clientHeight + scrollTop + newMessageHeight * 4 >= scrollHeight) {
    messages.scrollTop = scrollHeight
  }
}

socket.on('connect', () => {
  console.log('Connected to server.')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server.')
})


socket.on('newMessage', (message) => {
  const template = document.getElementById('message-template').innerHTML
  const messageList = document.getElementById('message-list')
  // const ol = document.createElement('ol')
  const li = document.createElement('li')
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const html = ejs.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  
  li.innerHTML = html
  messageList.appendChild(li).classList.add('message')
  scrollToBottom()
})

socket.on('newLocationMessage', (message) => {
  const template = document.getElementById('location-message-template').innerHTML
  const messageList = document.getElementById('message-list')
  const li = document.createElement('li')
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const html = ejs.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })
  
  li.innerHTML = html
  messageList.appendChild(li).classList.add('message')
  scrollToBottom()
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
