const Responses = require("../../../config/response");
const AuthModel = require("../models/auth.model");
const responses = new Responses();
let authModel = new AuthModel();

module.exports = class AuthController {
  async login(req, res) {
    const user = await authModel.login(req, res);
    if (user) {
      delete user.password;
      return responses.Response_200_Data(req, res, user);
    } else {
      return responses.Response_404_Data(req, res, {
        message: "userName or Password Is Wrong",
      });
    }
  }
};
