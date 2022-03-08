const { string } = require('joi');
const Joi = require('joi');

module.exports= Joi.object({
    assigned_to:Joi.string().required(),
});


