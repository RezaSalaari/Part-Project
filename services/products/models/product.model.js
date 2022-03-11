const queryBuilder = require("../../../");
const makeid = require("../../../helper/idGenerator");
const { UserEnum } = require("../../user-manager/entities/user.enum");

module.exports = class ProductModel {
  async findByRole(req, res) {
    try {
      let keySearch =
        req.user.user.role == UserEnum.SUPPORT ? "operator" : "assigned_to";
      const products = await queryBuilder.alfaOrm.find(
        "products",
        keySearch,
        req.user.user.id
      );
      return products;
    } catch (error) {}
  }

  async save(req, res) {
    try {
      let code;
      let isExistProduct;
      do {
        code = makeid(5);
        isExistProduct = await queryBuilder.alfaOrm.find(
          "products",
          "code",
          code
        );
      } while (isExistProduct.rows.length);
      req.data.code = code;
      req.data.operator = req.user.user.id;
      return await queryBuilder.alfaOrm.save(req.data, "products");
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(req, res) {
    try {
      return await queryBuilder.alfaOrm.findAll("products");
    } catch (error) {
      console.log(error);
    }
  }
};
