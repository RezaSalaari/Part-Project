const Joi = require("joi");

module.exports = Joi.object({
  gender: Joi.number().valid(1, 0).required(),
  role: Joi.valid("0", "1", "2", "3").required(),
  username: Joi.string().required(),
  password: Joi.number().required(),
});
