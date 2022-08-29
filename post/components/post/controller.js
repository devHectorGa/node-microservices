const nanoid = require('nanoid');
const error = require('../../../utils/error');

const TABLE = 'post';

module.exports = function (injectedStore) {
  const store = injectedStore || require('../../../store/dummy');

  function list() {
    return store.list(TABLE);
  }
  async function get(id) {
    const user = await store.get(TABLE, id);
    if (!user) {
      throw error('No existe el post', 404);
    }

    return user;
  }
  function upsert(data) {
    const post = {
      id: data.id,
      user: user,
      text: data.text,
    };

    if (!post.id) {
      post.id = nanoid();
    }

    return store.upsert(TABLE, post).then(() => post);
  }
  async function like(post, user) {
    const like = await store.upsert(TABLE + '_like', {
      post,
      user,
    });
    return like;
  }
  async function postsLiked(user) {
    const users = await store.query(TABLE + '_like', { user }, { post });
    return users;
  }

  async function postLikers(post) {
    const users = await store.query(TABLE + '_like', { post }, { post });
    return users;
  }
  return { list, get, upsert, like, postsLiked, postLikers };
};
