const request = require('graphql-request')

const authorQueries = require('./author.queries')

const secret = process.env.FAUNADB_SECRET_KEY

const urlApi = 'https://graphql.fauna.com/graphql'

const client = new request.GraphQLClient(urlApi, {
  headers: {
    authorization: `Bearer ${secret}`
  }
})

const createAuthor = async (req, res) => {
  const newAuthor = req.body

  const variables = {
    ...newAuthor
  }

  const { createAuthor } = await client.request(authorQueries.createAuthor, variables)

  res.status(200).json(createAuthor)
}

const getAllAuthors = async (req, res) => {
  const { allAuthors: { data } } = await client.request(authorQueries.getAllAuthors)

  res.status(200).json(data)
}

const updateAuthor = async (req, res) => {
  const { name, country } = req.body
  const { id } = req.params

  const variables = {
    id,
    name,
    country
  }

  const { updateAuthor } = await client.request(authorQueries.updateAuthor, variables)

  res.status(200).json(updateAuthor)
}

const getAuthor = async (req, res) => {
  const { id } = req.params

  const variables = {
    id
  }

  const { findAuthorByID } = await client.request(authorQueries.getAuthor, variables)

  res.status(200).json(findAuthorByID)
}

module.exports = {
  createAuthor,
  getAllAuthors,
  updateAuthor,
  getAuthor
}