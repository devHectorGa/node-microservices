module.exports = {
  apps: [
    {
      name: 'api',
      script: './api/index.js',
      instances: '2',
      exec_mode: 'cluster',
    },
    {
      name: 'mysql',
      script: './mysql/index.js',
      instances: '2',
      exec_mode: 'cluster',
    },
    {
      name: 'post',
      script: './post/index.js',
      instances: '2',
      exec_mode: 'cluster',
    },
    {
      name: 'cache',
      script: './cache/index.js',
      instances: '2',
      exec_mode: 'cluster',
    },
  ],
};
