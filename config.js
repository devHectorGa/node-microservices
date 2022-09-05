require('dotenv').config();

module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  mysql_service: {
    host: process.env.MYSQL_SERVICE_HOST,
    port: process.env.MYSQL_SERVICE_PORT,
  },
  cacheService: {
    host: process.env.CACHE_SERVICE_HOST,
    port: process.env.CACHE_SERVICE_PORT,
    dbUser: process.env.CACHE_SERVICE_DB_USER,
    dbPass: process.env.CACHE_SERVICE_DB_PASS,
    dbHost: process.env.CACHE_SERVICE_DB_HOST,
    dbPort: process.env.CACHE_SERVICE_DB_PORT,
  },
  post: {
    port: process.env.POST_SERVICE_PORT,
  },
};
