const express = require('express');

const secure = require('./secure');
const Controller = require('./index');
const response = require('../../../network/response');
const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/follow', following);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', deleteFunction);

function list(req, res, next) {
  Controller.list()
    .then((users) => response.success(req, res, users))
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user);
    })
    .catch(next);
}

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user);
    })
    .catch(next);
}

function deleteFunction(req, res, next) {
  Controller.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user);
    })
    .catch(next);
}

function follow(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}

function following(req, res, next) {
  Controller.following(req.params.id)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}

module.exports = router;
