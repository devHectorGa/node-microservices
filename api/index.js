const express = require('express');
const config = require('../config.js');
const user = require('./components/user/network');
const docs = require('./components/docs/network');
const auth = require('./components/auth/network');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', docs);

app.listen(config.api.port, () => {
  console.log('API escuchando en el puerto', config.api.port);
});
