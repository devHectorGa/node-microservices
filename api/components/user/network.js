const express = require('express');

const Controller = require('./index');
const response = require('../../../network/response');
const router = express.Router();

/**
 * @swagger
 * /api/user:
 *  get:
 *    summary: Get list of users
 *  produces:
 *    - application/json
 */
router.get('/', function (req, res) {
  Controller.list()
    .then((users) => response.success(req, res, users))
    .catch((error) => response.error(req, res, error));
});

router.get('/:id', function (req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user);
    })
    .catch((error) => response.error(req, res, error));
});

router.post('/', function (req, res) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user);
    })
    .catch((error) => response.error(req, res, error));
});
router.delete('/:id', function (req, res) {
  Controller.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user);
    })
    .catch((error) => response.error(req, res, error));
});

module.exports = router;
