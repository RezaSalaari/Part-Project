const { string } = require("joi");
const Joi = require("joi");

module.exports = Joi.object({
 subject:Joi.string(),
 content:Joi.string().required(),
 ticketId:Joi.string().required()
});