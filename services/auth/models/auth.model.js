const jwt = require("jsonwebtoken");
const { createToken, refreshToken, token } = require('~/helper/jwt');
const queryBuilder = require('~/index');

module.exports = class AuthModel {
  async login(req, res) {
    let isExistUser = await queryBuilder.alfaOrm.find(
      "users",
      "username",
      req.data.username
    );
    if (isExistUser.rows.length) {
      let user = isExistUser.rows[0];
      user.token = await token({ id: user.id, role: user.role });
      user.refreshToken = await refreshToken({ id: user.id, role: user.role });
      return user;
    }
  }
};
