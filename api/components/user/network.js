const express = require('express');

const Controller = require('./controller');
const response = require('../../../network/response');
const router = express.Router();

router.get('/', function (req, res) {
  const users = Controller.list();
  response.success(req, res, users);
});

module.exports = router;
