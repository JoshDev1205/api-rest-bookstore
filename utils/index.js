const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = {
  encrypPassword: async () => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
  },
  validatePassword: async (bodyPassword, password) => {
    return await bcrypt.compare(bodyPassword, password)
  },
  tokenValidation: (req, res, next) => {
    try {
      const token = req.header('authorization')
      if (!token) return res.status(401).json('Access Denied')

      const payload = jwt.verify(token, secret || '')

      req.userId = payload._id

      next()

    } catch (error) {
      res.status(400).send('Invalid Token')
    }
  }
}