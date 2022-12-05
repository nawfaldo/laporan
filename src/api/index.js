const ReportsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'reports',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const reportsHandler = new ReportsHandler(service, validator);
    server.route(routes(reportsHandler));
  },
};
