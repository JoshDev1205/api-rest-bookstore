const { Router } = require('express')
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
} = require('../controllers/book.controllers')
const { tokenValidation } = require('../utils')

const router = Router()

router
  .use(tokenValidation)
  .route('/')
  .get(getBooks)
  .post(createBook)

router
  .use(tokenValidation)
  .route('/:id')
  .get(getBook)
  .put(updateBook)
  .delete(deleteBook)

module.exports = router