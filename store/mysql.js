const mysql = require('mysql');

const config = require('../config');

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleConnection() {
  connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        setTimeout(handleConnection, 200);
      } else {
        console.error('[db_error]', err);
      }
    } else {
      console.log('DB Connected!');
    }
  });

  connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection();
    } else {
      console.error('[db_err]', err);
      throw err;
    }
  });
}

handleConnection();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * from ${table}`, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

async function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from ${table} WHERE id="${id}"`,
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

async function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

async function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data?.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

async function upsert(table, data) {
  let row = [];
  if (data?.id) row = await get(table, data?.id);
  if (row?.length) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
}

async function remove(table, id) {}

async function query(table, conditions, join) {
  let joinQuery = '';
  if (Object.entries(join).length) {
    const key = Object.keys(join)[0];
    const val = join[key];

    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ?`,
      conditions,
      (err, result) => {
        if (err) return reject(err);
        resolve(result || null);
      }
    );
  });
}

module.exports = { list, get, upsert, remove, query };
