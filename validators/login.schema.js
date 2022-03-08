const Joi = require("joi");

module.exports = Joi.object({
  username: Joi.required(),
  password: Joi.required(),
});
