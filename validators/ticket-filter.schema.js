const { string } = require("joi");
const Joi = require("joi");

module.exports = Joi.object({
 fromDate:Joi.date(),
 toDate:Joi.date(),
status:Joi.valid('0','1','2','3'),
assigned_to:Joi.string(),
assigned_operator:Joi.boolean()
});