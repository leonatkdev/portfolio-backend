const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API description',
    },
  },
  apis: ['./routes/*.js'], // Specify the path to your API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
