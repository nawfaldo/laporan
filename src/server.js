const Hapi = require('@hapi/hapi');
const path = require('path');

// Reports
const reports = require('./api/');
const ReportsService = require('./services/ReportsService');
const ReportsValidator = require('./validator/');

const init = async () => {
  const reportsService = new ReportsService();

  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: reports,
      options: {
        service: reportsService,
        validator: ReportsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
