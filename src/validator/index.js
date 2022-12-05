const { ReportPayloadSchema } = require('./schema');
const InvariantError = require('../exceptions/InvariantError');

const ReportsValidator = {
  validateReportsPayload: (payload) => {
    const validationResult = ReportPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ReportsValidator;
