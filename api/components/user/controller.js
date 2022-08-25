const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';

module.exports = function (injectedStore) {
  const store = injectedStore || require('../../../store/dummy');

  function list() {
    return store.list(TABLE);
  }
  function get(id) {
    return store.get(TABLE, id);
  }
  function upsert(data) {
    const user = {
      name: data?.name,
      username: data?.username,
      id: data?.id || nanoid(),
    };
    if (data?.username || data.password) {
      auth.upsert({
        id: user.id,
        username: data?.username,
        password: data?.password,
      });
    }
    return store.upsert(TABLE, user);
  }
  function remove(id) {
    return store.remove(TABLE, id);
  }
  function follow(user_from, user_to) {
    return store.upsert(`${TABLE}_follow`, { user_from, user_to });
  }
  function following(user) {
    const join = {};
    join[TABLE] = 'user_to';
    const query = { user_from: user };
    return store.query(`${TABLE}_follow`, query, join);
  }

  return { list, get, upsert, remove, follow, following };
};
