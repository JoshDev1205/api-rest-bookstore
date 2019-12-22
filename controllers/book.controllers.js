const request = require('graphql-request')

const bookQueries = require('./book.queries')

const secret = process.env.FAUNADB_SECRET_KEY

const urlApi = 'https://graphql.fauna.com/graphql'

const client = new request.GraphQLClient(urlApi, {
  headers: {
    authorization: `Bearer ${secret}`
  }
})

const createBook = async (req, res) => {
  const { title, description, quantity, authorId, price } = req.body

  const variables = {
    title,
    description,
    quantity,
    authorId,
    price
  }

  const { createBook } = await client.request(bookQueries.createBook, variables)

  res.status(200).json(createBook)
}

const getBooks = async (req, res) => {
  const { allBooks: { data } } = await client.request(bookQueries.getAllBooks)

  res.status(200).json(data)
}

const getBook = async (req, res) => {
  const { id } = req.params

  const variables = {
    id
  }

  const { findBookByID } = await client.request(bookQueries.getBook, variables)

  res.status(200).json(findBookByID)
}

const updateBook = async (req, res) => {
  const { id } = req.params
  const { title, description, quantity, authorId, price } = req.body

  const variables = {
    id,
    title,
    description,
    quantity,
    authorId,
    price
  }

  const { updateBook } = await client.request(bookQueries.updateBook, variables)

  res.status(200).json(updateBook)
}

const deleteBook = async (req, res) => {
  const { id } = req.params

  const variables = {
    id
  }

  const { deleteBook } = await client.request(bookQueries.deleteBook, variables)

  res.status(200).json({ message: 'Book Deleted' })
}

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
}