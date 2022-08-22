const jwt = require('jsonwebtoken');

function sign(data) {
  return jwt.sign(data, 'secret-letters');
}

module.exports = { sign };
