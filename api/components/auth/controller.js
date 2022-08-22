const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const { sign } = require('../../../auth');

const TABLE = 'auth';

module.exports = function (injectedStore) {
  const store = injectedStore || require('../../../store/dummy');

  async function upsert(data) {
    const authData = {
      username: data?.username,
      password: bcrypt.hashSync(data?.password, bcrypt.genSaltSync()),
      id: data?.id || nanoid(),
    };
    return store.upsert(TABLE, authData);
  }
  async function login(username, password) {
    const data = await store.query(TABLE, { username });
    if (!data || !bcrypt.compareSync(password, data?.password)) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    return sign(data);
  }

  return { upsert, login };
};
