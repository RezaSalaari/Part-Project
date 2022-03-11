const Responses = require('~/config/response');
const ProductModel = require('~/services/products/models/product.model');
const response = new Responses();
let productModel = new ProductModel();
module.exports = class ProductsController {
  async findByRole(req, res) {
    const products = await productModel.findByRole(req, res);
    if (products != undefined) {
      return response.Response_200_Data(req, res, products.rows);
    } else {
      return response.Response_400_Data(req, res, {
        message: "only Suppurt And Empolye can view them product",
      });
    }
  }
  async createProduct(req, res) {
    const product = await productModel.save(req, res);
    if (product != undefined)
      return response.Response_200_Data(req, res, product.rows);
    else {
      return response.Response_500_Data(req, res, { message: "DB Error" });
    }
  }

  async getAll(req, res) {
    let products = await productModel.getAll(req, res);
    return response.Response_200_Data(req, res, products.rows);
  }
};
