const express = require('express');

const Controller = require('./index');
const response = require('../../../network/response');
const router = express.Router();

router.post('/login', function (req, res, next) {
  Controller.login(req.body.username, req.body.password)
    .then((token) => {
      if (!token) {
        throw new Error('Información invalida');
      }
      response.success(req, res, { token }, 200);
    })
    .catch(next);
});

module.exports = router;
