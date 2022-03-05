const c = require("../../../config");
const ProductModel = require("./../models/product.model");
let productModel = new ProductModel();
module.exports = class ProductsController {
  async findByRole(req, res) {
    try {
      const products = await productModel.findByRole(req, res);
      if (products) {
        res.statusCode = c.statusCodes.SUCCESS;
        res.setHeader("Content-Type", c.contentTypes.JSON);
        return res.end(JSON.stringify(products.rows));
      }
    } catch (error) {}
  }
  async createProduct(req, res) {
    try {
      const product = await productModel.save(req, res);
      if (product.rows && product.rows.length != 0) {
        res.statusCode = c.statusCodes.SUCCESS;
        res.setHeader("Content-Type", c.contentTypes.JSON);
        return res.end(JSON.stringify(...product.rows));
      }
    } catch (error) {}
  }

  async getAll(req, res) {
    try {
      let products = await productModel.getAll(req, res);
    res.statusCode = c.statusCodes.SUCCESS;
    res.setHeader("Content-Type", c.contentTypes.JSON);
    return res.end(JSON.stringify(products.rows));
    } catch (error) {
      
    }
    
  }
};
