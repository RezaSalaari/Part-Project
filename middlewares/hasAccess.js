var events = require("../node_modules/stric-router").eventEmitter;
const config = require("./../config");
let roles;
events.on("roles", function (data) {
roles=data
});
module.exports = function (req, res, next) {
  if (req.user.user && req.user.user.role && roles && roles.length) {
  
    let isRole = roles.find((x) => x == req.user.user.role);
    if (isRole == undefined) {
      res.statusCode = config.statusCodes.Forbidden;
      res.setHeader("Content-Type", config.contentTypes.JSON);
      return res.end(JSON.stringify("Access Is Denied !!"));
    }
    // roles=[]

    next();
  }
  next();
};
