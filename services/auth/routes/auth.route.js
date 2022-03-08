const Validator = require("alfavalidator");
const AuthController = require("../controllers/auth.controller");
const dataParser = require('strict-data-parser');
const loginSchema = require("../../../validators/login.schema");
let authController = new AuthController();
module.exports = {
  "/auth/login": {
    POST: {
      function: authController.login,
      middlewares: [dataParser,Validator(loginSchema)],
    },
  },
};
