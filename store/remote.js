const { response, json } = require('express');
const fetch = require('node-fetch');
const { error } = require('../network/response');
const config = require('../config');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function req(url, options) {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then((response) => response.json())
        .then((json) => resolve(json.body))
        .catch((err) => reject(err.message));
    });
  }

  function list(table) {
    return req(`${URL}/${table}`);
  }
  function get(table, id) {
    return req(`${URL}/${table}/${id}`);
  }
  function upsert(table, data) {
    return req(`${URL}/${table}`, { method: 'PUT', body: data });
  }
  function insert(table, data) {
    return req(`${URL}/${table}`, { method: 'POST', body: data });
  }
  function query(table, query, join) {
    return req(`${URL}/${table}`, { method: 'POST', body: { query, join } });
  }

  return { list, get, insert, upsert, query };
}

module.exports = createRemoteDB;
