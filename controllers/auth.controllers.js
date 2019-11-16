const jwt = require('jsonwebtoken')
const request = require('graphql-request')
const { encrypPassword, validatePassword } = require('../utils')
const config = require('../config')
const authControllers = require('./auth.queries')

const secret = process.env.FAUNADB_SECRET_KEY

const urlApi = 'https://graphql.fauna.com/graphql'

const client = new request.GraphQLClient(urlApi, {
  headers: {
    authorization: `Bearer ${secret}`
  }
})


const signup = async (req, res) => {
  const encryptedPassword = await encrypPassword(req.body.password)

  const variables = {
    email: req.body.email,
    password: encryptedPassword
  }

  const result = await client.request(authControllers.createUser, variables)

  const token = jwt.sign({ _id: result._id }, config.secret || '', {
    expiresIn: 60 * 60 * 24
  })

  res.header('authorization', token).status(200).json(result)
}

const signin = async (req, res) => {
  const { email, password } = req.body

  const variables = {
    email
  }

  const response = await client.request(authControllers.findUserByEmail, variables)

  const { findUserByEmail: { data } } = response

  const user = data[0]

  const isValidPassword = await validatePassword(
    password,
    user.password
  )

  if (!isValidPassword) return res.status(400).json('Invalid Password')

  const token = jwt.sign({ _id: user._id }, config.secret || '')

  res.header('authorization', token).status(200).json(user)
}

module.exports = {
  signup,
  signin
}