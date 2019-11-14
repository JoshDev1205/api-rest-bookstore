const { Router } = require('express')

const router = Router()

const getAllAuthors = (req, res, next) => {
  res.status(200).json({ message: 'Hello From Routes' })
}

router.route('/').get(getAllAuthors)

module.exports = router