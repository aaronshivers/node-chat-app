require('dotenv').config()

const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { PORT } = process.env
const app = express()
const server = http.createServer((app))
const io = socketIO(server)

app.use(express.static('public'))

// app.get('/', (req, res) => res.render('index'))

io.on('connection', (socket) => {
  console.log('New user connected.')

  socket.emit('newMessage', {
    from: 'jerry@aol.net',
    text: 'Would you like some pizza?',
    createdAt: 23423
  })

  socket.on('createMessage', (message) => {
    console.log('createMessagee', message)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(PORT, () => console.log(`Server running on port: ${ PORT }.`))
