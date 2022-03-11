const Validator = require("alfavalidator");
const ProductControler = require('~/services/products/controllers/product.controller');
const dataParser = require("strict-data-parser");
const isAuthenticate = require('~/middlewares/isAuthenticate');
const { UserEnum } = require('~/services/user-manager/entities/user.enum');
const productSchema = require('~/validators/product.schema');
const isAccess = require('~/middlewares/isAccess');

let productControler = new ProductControler();
module.exports = {
  "/products": {
    POST: {
      function: productControler.createProduct,
      middlewares: [
        dataParser,
        isAuthenticate,
        Validator(productSchema),
        isAccess,
      ],
      roles: [UserEnum.SUPPORT],
    },
    GET: {
      function: productControler.getAll,
      middlewares: [dataParser, isAuthenticate, isAccess],
      roles: [UserEnum.ADMIN, UserEnum.SUPER_ADMIN],
    },
  },
  "/products/users": {
    GET: {
      function: productControler.findByRole,
      middlewares: [dataParser, isAuthenticate, isAccess],
      roles: [UserEnum.EMPLOYE, UserEnum.SUPPORT],
    },
  },
};
