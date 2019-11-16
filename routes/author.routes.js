const { Router } = require('express')
const { createAuthor, getAllAuthors, getAuthor, updateAuthor } = require('../controllers/author.controller')

const router = Router()

router.route('/').get(getAllAuthors).post(createAuthor)

router.route('/:id').get(getAuthor).put(updateAuthor)

module.exports = router