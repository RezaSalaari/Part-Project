const { string } = require("joi");
const Joi = require("joi");

module.exports = Joi.object({
 ticketId:Joi.string().required(),
});