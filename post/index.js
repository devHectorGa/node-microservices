const express = require('express');
const config = require('../config.js');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', post);
app.use(errors);

app.listen(config.post.port, () => {
  console.log('Microservicio POST escuchando en el puerto', config.post.port);
});
