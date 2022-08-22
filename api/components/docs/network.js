const express = require('express');
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    definition: {
      info: {
        version: '1.0.0',
        title: 'Microservice Node App',
        description: 'API documentation for use',
      },
      host: 'localhost:3000',
      basePath: '/api',
    },
  },
  apis: ['api/components/user/*.yml'],
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
