const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const { sign } = require('../../../auth');
const error = require('../../../utils/error');

const TABLE = 'auth';

module.exports = function (injectedStore) {
  const store = injectedStore || require('../../../store/dummy');

  async function upsert(data) {
    const authData = {
      username: data?.username,
      id: data?.id || nanoid(),
    };
    if (data?.password) {
      authData.password = bcrypt.hashSync(data?.password, bcrypt.genSaltSync());
    }
    return store.upsert(TABLE, authData);
  }
  async function login(username, password) {
    const data = await store.query(TABLE, { username });
    if (!data[0] || !bcrypt.compareSync(password, data[0]?.password)) {
      throw error('Usuario o contraseña incorrectos', 401);
    }
    return sign(data);
  }

  return { upsert, login };
};
