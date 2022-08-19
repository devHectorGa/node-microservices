const filterById = (id) => (item) => item.id === id;

const db = {
  user: [
    { id: 1, name: 'Hector' },
    { id: 2, name: 'Ferney' },
  ],
};

function list(table) {
  return db[table];
}

function get(table, id) {
  const collection = list(table);
  return collection.find(filterById(id));
}

function upsert(table, data) {
  collection[table].push(data);
}

function remove(table, id) {
  const collection = list(table);
  const index = collection.find(filterById(id));
  if (index >= 0) {
    collection.splice(index, 1);
  }
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
