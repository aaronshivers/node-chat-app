const moment = require('moment')

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}

const generateLocationMessage = (from, url) => {
  return {
    from,
    url,
    createdAt: moment().valueOf()
  }
}

module.exports = { generateMessage, generateLocationMessage }
