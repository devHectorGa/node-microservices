const express = require('express');

const response = require('../network/response');
const router = express.Router();
const Store = require('../store/mysql');

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);
router.post('/:table/query', query);

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
async function insert(req, res, next) {
  Store.insert(req.params.table, req.body)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}
async function upsert(req, res, next) {
  Store.upsert(req.params.table, req.body)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}
async function query(req, res, next) {
  Store.query(req.params.table, req.body.query, req.body.join)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}

module.exports = router;
