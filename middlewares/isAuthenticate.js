const jwt = require("jsonwebtoken");
const config = require("./../config");
require("dotenv").config;
module.exports = (req, res, next) => {
  const token = String(req.headers["authorization"]).split(" ")[1];
  if (!token) {
    res.writeHead(config.statusCodes.Forbidden, { "Content-type": "application/json" });
    res.write('A token is required for authentication');
   return res.end();
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    return next();
  } catch (err) {
    res.writeHead(config.statusCodes.UNAUTHORIZED, { "Content-type": "application/json" });
    res.write(JSON.stringify(err));
   return res.end();
  }
};
