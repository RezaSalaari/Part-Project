const jwt = require("jsonwebtoken");
const Responses = require("../config/response");
const response = new Responses();
require("dotenv").config;
module.exports = (req, res, next) => {
  const token = String(req.headers["authorization"]).split(" ")[1];
  if (!token) {
    return response.Response_400_Data(req, res, {
      message: "A token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    return next();
  } catch (err) {
    return response.Response_401_Data(req, res, { message: err });
  }
};
