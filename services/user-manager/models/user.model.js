const queryBuilder = require("../../..");
const { UserEnum } = require("../entities/user.enum");
module.exports = class UserModel {
  async save(req) {
    try {
      const isExistUsername = await queryBuilder.alfaOrm.find(
        "users",
        "username",
        `${req.username}`
      );
      if (!isExistUsername.rows.length > 0) {
        return await queryBuilder.alfaOrm.save(req.data, "users");
      }
    } catch (error) {}
  }
  async findAll(req) {
    try {
      return await queryBuilder.alfaOrm.findAll("users");
    } catch (error) {}
  }
};
