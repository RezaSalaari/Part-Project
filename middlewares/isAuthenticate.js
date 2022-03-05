const jwt = require("jsonwebtoken");
const config = require('./../config')
require('dotenv').config
module.exports = (req, res, next) => {
  try {
    const token =req.headers.authorization.split(' ')[1];
    if (token) {
      const decode = jwt.verify(token, process.env.ACCESS_TOKEN );
      req.user = decode;
      next();
    }
  } catch (error) {
    res.statusCode = config.statusCodes.UNAUTHORIZED;
    res.setHeader("Content-Type", config.contentTypes.JSON);
    res.end(JSON.stringify('Unauthorized ! '));
  }
};
