const { Router } = require('express')
const { createAuthor, getAllAuthors, getAuthor, updateAuthor } = require('../controllers/author.controller')
const { tokenValidation } = require('../utils')

const router = Router()

router
  .use(tokenValidation)
  .route('/')
  .get(getAllAuthors)
  .post(createAuthor)

router
  .use(tokenValidation)
  .route('/:id')
  .get(getAuthor)
  .put(updateAuthor)

module.exports = router