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
  {
    method: 'DELETE',
    path: '/reports/{id}',
    handler: handler.deleteReportByIdHandler,
  },
];

module.exports = routes;
