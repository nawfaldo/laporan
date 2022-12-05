const Joi = require('joi');

const ReportPayloadSchema = Joi.object({
  reporterName: Joi.string().required(),
  reporterPhoneNumber: Joi.number().required(),
  image: Joi.string()
    .valid(
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    )
    .required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = { ReportPayloadSchema };
