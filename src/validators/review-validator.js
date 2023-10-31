const Joi = require("joi");

const checkReviewIdSchema = Joi.object({
  reviewId: Joi.number().integer().positive().required(),
});

exports.checkReviewIdSchema = checkReviewIdSchema;
