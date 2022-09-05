const express = require('express');

const response = require('../network/response');
const router = express.Router();
const Store = require('../store/redis');

router.get('/:table', list);
router.get('/:table/:id', get);
router.put('/:table', upsert);

async function list(req, res, next) {
  Store.list(req.params.table)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}
async function get(req, res, next) {
  Store.get(req.params.table, req.params.id, req.body)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}
async function upsert(req, res, next) {
  Store.upsert(req.params.table, req.body)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}

module.exports = router;
