const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')

const PORT = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const users = new Users()

app.use(express.static('public'))

io.on('connection', (socket) => {

  console.log('New user connected.')

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.')
    }

    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)
    // socket.leave('Party Room')

    // io.emit -> io.to('Party Room').emit
    // socket.broadcast.emit -> socket.broadcast.to('Party Room').emit
    // socket.emit

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${ params.name } has joined`))

    callback()
  })

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id)

    if (user && isRealString(message.text)) {      
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
    }

    callback('This is from the server.')
  })

  socket.on('createLocationMessage', (latitude, longitude) => {
    const user = users.getUser(socket.id)

    if (user) {
      const url = `https://www.google.com/maps/search/?api=1&query=${ latitude },${ longitude }`
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name.toUpperCase(), url))
    }

  })

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
  })
})

server.listen(PORT, () => console.log(`Server running on port: ${ PORT }.`))
