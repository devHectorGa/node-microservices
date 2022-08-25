const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const {
  jwt: { secret },
} = require('../config');

function sign({ password: _, ...data }) {
  return jwt.sign(data, secret, { expiresIn: '4h' });
}

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(auth) {
  if (!auth || auth?.indexOf('Bearer ') !== 0) {
    throw error('Token no válido', 401);
  }

  return auth.replace('Bearer ', '');
}

function decodeHeader(req) {
  const {
    headers: { authorization = '' },
  } = req;
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
}
const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    if (!decoded.id === owner) {
      throw error('No puedes hacer esto', 401);
    }
  },
  logged: function (req) {
    const decoded = decodeHeader(req);
    if (!decoded.id) {
      throw error('No puedes hacer esto', 401);
    }
  },
};

module.exports = { check, sign };
