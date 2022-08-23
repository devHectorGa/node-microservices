const express = require('express');

const secure = require('./secure');
const Controller = require('./index');
const response = require('../../../network/response');
const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', deleteFunction);

function list(req, res) {
  Controller.list()
    .then((users) => response.success(req, res, users))
    .catch((error) => response.error(req, res, error));
}

function get(req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user);
    })
    .catch((error) => response.error(req, res, error));
}

function upsert(req, res) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user);
    })
    .catch((error) => response.error(req, res, error));
}

function deleteFunction(req, res) {
  Controller.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user);
    })
    .catch((error) => response.error(req, res, error));
}

module.exports = router;
