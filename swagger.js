const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Workforce Directory API',
        description: 'API for managing workforce contacts and employees',
    },
    host: 'localhost:8080',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Genera el archivo swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);