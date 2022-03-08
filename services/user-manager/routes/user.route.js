const dataParser = require("strict-data-parser");
const Validator = require("alfavalidator");
const UserController = require("../controllers/user.controller");
const isAuthenticate = require("../../../middlewares/isAuthenticate");
const hasAccess = require("../../../middlewares/hasAccess");
const { UserEnum } = require("../entities/user.enum");
const userSchema = require("../../../validators/user.schema");
let userController = new UserController();
module.exports = {
  "/user": {
    GET: {
      function: userController.getUsers,
      middlewares: [dataParser,isAuthenticate, hasAccess],
      roles: [UserEnum.SUPER_ADMIN, UserEnum.ADMIN],
    },
    POST: {
      function: userController.createUser,
      middlewares: [dataParser,isAuthenticate ,Validator(userSchema), hasAccess],
      roles: [UserEnum.SUPER_ADMIN, UserEnum.ADMIN],
    },
  },
};
