const ClientError = require('../exceptions/ClientError');
const upload = require('../utils/fileUpload');

class ReportsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postReportHandler = this.postReportHandler.bind(this);
    this.getReportsHandler = this.getReportsHandler.bind(this);
    this.deleteReportByIdHandler = this.deleteReportByIdHandler.bind(this);
  }

  async postReportHandler(request, h) {
    try {
      const {
        image,
        reporterName,
        reporterPhoneNumber,
        location,
        description,
      } = request.payload;

      const parsedInt = parseInt(reporterPhoneNumber);
      const toInteger = Number(parsedInt);

      const toValidate = {
        reporterName,
        reporterPhoneNumber: toInteger,
        image: image.hapi.headers['content-type'],
        location,
        description,
      };

      this._validator.validateReportsPayload(toValidate);

      let responseFile = null;
      await upload(request.payload.image).then((resp) => {
        responseFile = { fileUrl: resp.Location };
      });

      const imageUrl = responseFile.fileUrl;

      const report = await this._service.addNewReport({
        reporterName,
        reporterPhoneNumber: toInteger,
        image: imageUrl,
        location,
        description,
      });

      const response = h.response({
        status: 'success',
        message: 'Berhasil menambahkan Laporan.',
        data: {
          report,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      console.log(error);

      const response = h.response({
        status: 'error',
        message: 'Maaf, Server Mengalami Kegagalan.',
      });

      response.code(500);
      return response;
    }
  }
  async getReportsHandler(request, h) {
    try {
      const reports = await this._service.getReports();

      return {
        status: 'success',
        data: {
          reports,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, Server Mengalami Kegagalan.',
      });

      response.code(500);
      return response;
    }
  }

  async deleteReportByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteReportById(id);

      return {
        status: 'success',
        message: 'Laporan berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, Server Mengalami Kegagalan.',
      });

      response.code(500);
      return response;
    }
  }
}

module.exports = ReportsHandler;
