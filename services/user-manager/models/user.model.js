const queryBuilder = require("../../..");
const Responses = require("../../../config/response");
const { UserEnum } = require("../entities/user.enum");
const response = new Responses();
module.exports = class UserModel {
  async save(req, res) {
    let isExistUser = await queryBuilder.alfaOrm.find(
      "users",
      "username",
      req.data.username
    );
    let user;
    if (isExistUser && isExistUser.rows && !isExistUser.rows.length) {
      user = await queryBuilder.alfaOrm.save(req.data, "users");
    } else {
      user = undefined;
    }
    return user;
  }
  async findAll(req) {
    try {
      return await queryBuilder.alfaOrm.findAll("users");
    } catch (error) {}
  }
};
