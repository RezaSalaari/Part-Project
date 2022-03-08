const c = require("../../../config");
const queryBuilder = require("../../..");
const UserModel = require("../models/user.model");
let userModel = new UserModel();
module.exports = class UserController {
  async getUsers(req, res) {
    const users = await userModel.findAll(req);
    if (users.rows.length) {
      res.statusCode = c.statusCodes.SUCCESS;
      res.setHeader("Content-Type", c.contentTypes.JSON);
      res.end(JSON.stringify(users.rows));
    }
  }

  async createUser(req, res) {
    try {
      const user = await userModel.save(req);
      if (user && user.rows.length>0) {
        res.statusCode = c.statusCodes.SUCCESS;
        res.setHeader("Content-Type", c.contentTypes.JSON);
        return res.end(JSON.stringify( ...user.rows));
      } else {
    
        res.statusCode = c.statusCodes.CONFLICT;
        res.setHeader("Content-Type", c.contentTypes.JSON);
        return res.end(JSON.stringify("UserName Conflict !!"));
      }
    } catch (error) {}
  }
};
