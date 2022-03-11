require('dotenv').config()
const jwt = require("jsonwebtoken");
const  jwtConfig = require("../config/jwt").jwtConfig;

exports.token = async (user) => {
  return await jwt.sign({user:user}, jwtConfig.accessKey, {
    expiresIn: jwtConfig.expireAcessTime,
  });
};

exports.refreshToken = async (user) => {
  return await jwt.sign({user:user}, jwtConfig.accessKey, {
    expiresIn: jwtConfig.expireRefreshTime,
  });
};
