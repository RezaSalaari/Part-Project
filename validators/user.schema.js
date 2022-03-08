const Joi = require('joi');
const { UserEnum } = require('../services/user-manager/entities/user.enum');

module.exports= Joi.object({
   gender:Joi.number().valid(1,0).required(),
   role:Joi.valid('0','1','2','3').required(),
   username:Joi.string().required(),
   password:Joi.string().required()
});


