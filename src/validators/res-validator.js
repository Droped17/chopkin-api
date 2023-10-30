const Joi = require("joi");

exports.resIdSchema = Joi.object({
  resId: Joi.number().integer().positive().required(),
});
