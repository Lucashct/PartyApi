const crypto = require('crypto')

const generateHashToPWD = (password) => {
  const hashPWD = crypto.createHash('sha1')
  hashPWD.update(password)
  return hashPWD.digest('hex')
}

module.exports = {
  generateHashToPWD,
}