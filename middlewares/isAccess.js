const Router = require("stric-router");
const Responses = require("../config/response");
const response = new Responses();

module.exports = function (req, res, next) {
  const Roles = Router.Router.getRole(req, res);
  if (req.user.user && req.user.user.role && Roles && Roles.length) {
    let isRole = Roles.find((x) => x == req.user.user.role);
    if (isRole !== undefined) {
      next();
    } else {
      return response.Response_401_Data(req, res, {
        message: "UnAuthorized !! ",
      });
    }
  } else {
    next();
  }
};
