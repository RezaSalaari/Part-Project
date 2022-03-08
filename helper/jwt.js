const jwt = require("jsonwebtoken");
const { jwtConstants } = require("../services/auth/config");
require('dotenv').config
exports.token = async (user) => {
  return await jwt.sign({user:user}, jwtConstants.accessKey, {
    expiresIn: jwtConstants.expireAcessTime,
  });
};

exports.refreshToken = async (user) => {
  return await jwt.sign({user:user}, jwtConstants.accessKey, {
    expiresIn: jwtConstants.expireRefreshTime,
  });
};
