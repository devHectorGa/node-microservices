function err(message, code) {
  let e = new Error(message);
  e.statusCode = code || 500;
  return e;
}

module.exports = err;
