const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const AuthorRoutes = require('./routes/author.routes')

const PORT = process.env.PORT || 4000

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({ message: 'Api del curso de Vuejs desde Cero' })
})

app.use('/author', AuthorRoutes)

app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`))
