const routes = (handler) => [
  {
    method: 'POST',
    path: '/reports',
    handler: handler.postReportHandler,
    options: {
      payload: {
        parse: true,
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'GET',
    path: '/reports',
    handler: handler.getReportsHandler,
  },
];

module.exports = routes;
