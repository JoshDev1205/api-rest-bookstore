const express = require('express')
const PORT = process.env.PORT || 4000
const AuthorRoutes = require('./routes/author.routes')

const app = express()

app.get('/', (req, res) => {
  res.send({ message: 'Api del curso de Vuejs desde Cero' })
})

app.use('/author', AuthorRoutes)

app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`))
