const AuthModel = require("../models/auth.model");
const c = require("./../config");
let authModel = new AuthModel();
module.exports = class AuthController {
  async login(req, res) {
    const user = await authModel.login(req, res);
    if (user) {
      delete user.password;
      res.writeHead(200, { "Content-type": "application/json" });
      res.write(JSON.stringify({ user }));
      res.end();
    }
  }
};
