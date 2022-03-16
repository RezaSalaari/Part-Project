const queryBuilder = require('~/index');
const UserModel = require('~/services/user-manager/models/user.model');
const Responses = require('~/config/response');
let userModel = new UserModel();
const response = new Responses();

module.exports = class UserController {
  async getUsers(req, res) {
    const users = await userModel.findAll(req);
    if (users.rows.length) {
      return response.Response_200_Data(req, res, users.rows);
    }
  }

  async createUser(req, res) {
    const user = await userModel.save(req, res);
    if (user) {
      return response.Response_200_Data(req, res, {...user.rows});
    } else {
      return response.Response_409_Data(req, res, {
        message: "Username Conflict !!! ",
      });
    }
  }
};
