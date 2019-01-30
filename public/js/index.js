const socket = io()

socket.on('connect', () => {
  console.log('Connected to server.')

  socket.emit('createMessage', {
    from: 'mary@yahoo.com',
    text: 'I like taco sauce!'
  })
})

socket.on('disconnect', () => {
  console.log('Disconnected from server.')
})

socket.on('newMessage', (message) => {
  console.log('New Message', message)
})
