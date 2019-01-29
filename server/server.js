require('dotenv').config()

const express = require('express')

const app = express()
const { PORT } = process.env

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

app.listen(PORT, () => console.log(`Server running on port: ${ PORT }.`))
