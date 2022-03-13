const { string } = require("joi");
const Joi = require("joi");

module.exports = Joi.object({
priority:Joi.valid('0','1','2','3'),
itemId:Joi.string().required(),
subject:Joi.string(),
content:Joi.string().required(),
category:Joi.string(),
liked:Joi.boolean(),
solved:Joi.allow()
});
