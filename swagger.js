const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vedor Portal APIs',
    description: 'Description'
  },
  host: 'localhost:8000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/vendorRoutes.js', './routes/projectRoutes.js', './routes/employeeRoutes.js', './routes/orderRoutes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);