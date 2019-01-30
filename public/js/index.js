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

document.getElementById('message-form').addEventListener('submit', e => {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: document.getElementById('message').value
  }, () => {

  })
})

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hello'
// }, (data) => {
//   console.log('Messge was received: ', data)
// })