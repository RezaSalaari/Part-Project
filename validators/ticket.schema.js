const { string } = require("joi");
const Joi = require("joi");

module.exports = Joi.object({
status:Joi.valid('0','1','2','3'),
priority:Joi.valid('0','1','2','3'),
itemId:Joi.string().required(),
});
