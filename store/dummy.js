const filterById = (id) => (item) => item.id === id;

const filterByConditions = (conditions) => (item) =>
  Object.keys(conditions).reduce(
    (prev, key) => prev && conditions[key] === item[key],
    true
  );
const db = {
  user: [
    { id: '1', name: 'Hector' },
    { id: '2', name: 'Ferney' },
  ],
};

async function list(table) {
  return db[table];
}

async function get(table, id) {
  const collection = await list(table);
  return collection.find(filterById(id));
}

async function upsert(table, data) {
  const collection = await list(table);
  collection ? collection?.unshift(data) : (db[table] = [data]);
}

async function remove(table, id) {
  const collection = await list(table);
  const index = collection.find(filterById(id));
  if (index >= 0) {
    return collection.splice(index, 1);
  }
  throw new Error('Do not found user');
}

async function query(table, conditions) {
  const collection = await list(table);
  const data = collection?.find(filterByConditions(conditions));
  return data;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
