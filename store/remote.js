const fetch = require('node-fetch');
const { error } = require('../network/response');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function req(url, body, options) {
    console.log(options);
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          'content-type': 'application/json',
        },
        ...options,
        ...(body && { body: JSON.stringify(body) }),
      })
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
    return req(`${URL}/${table}`, data, { method: 'PUT' });
  }
  function insert(table, data) {
    return req(`${URL}/${table}`, data, { method: 'POST' });
  }
  function query(table, query = {}, join = {}) {
    return req(`${URL}/${table}/query`, { query, join }, { method: 'POST' });
  }

  return { list, get, insert, upsert, query };
}

module.exports = createRemoteDB;
