const { Router } = require('express')
const { signin, signup } = require('../controllers/auth.controllers')

const router = Router()

router.route('/signup').post(signup)
router.route('/signin').post(signin)

module.exports = router
