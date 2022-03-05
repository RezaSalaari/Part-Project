const Validator = require("alfavalidator");
const AuthController = require("../controllers/auth.controller");
const dataParser = require('strict-data-parser');
let authController = new AuthController();
module.exports = {
  "/auth/login": {
    POST: {
      function: authController.login,
      middlewares: [dataParser,Validator('login')],
    },
  },
};
