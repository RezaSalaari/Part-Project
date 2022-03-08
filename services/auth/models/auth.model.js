const jwt = require("jsonwebtoken");
const { createToken, refreshToken, token } = require("../../../helper/jwt");
const queryBuilder = require("../../..");
const { statusCodes, contentTypes } = require("../../../config");

module.exports = class AuthModel {
  async login(req, res) {
    
    let isExistUser=await queryBuilder.alfaOrm.find('users','username',req.data.username);

    if (isExistUser.rows.length) {
      let user = isExistUser.rows[0];
      user.token = await token({id:user.id,role:user.role});
      user.refreshToken = await refreshToken({id:user.id,role:user.role});
      return user;
    } else {
      res.statusCode = statusCodes.NOTFOUND;
      res.setHeader("Content-Type", contentTypes.JSON);
      res.end(
        JSON.stringify({
          messsage: 'Wrong Password Or Username , Please Try Again with correct Data',
        })
      );
    }
  }

}
