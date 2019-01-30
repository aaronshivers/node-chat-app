require('dotenv').config()

const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')
const { PORT } = process.env
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   const { newMessage } = req.query
//   console.log(req.query)
// })

io.on('connection', (socket) => {

  console.log('New user connected.')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'))
  
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server.')
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(PORT, () => console.log(`Server running on port: ${ PORT }.`))
