const Validator = require("alfavalidator");
const ProductControler = require("../controllers/product.controller");
const dataParser = require('strict-data-parser');
const isAuthenticate = require("../../../middlewares/isAuthenticate");
const { UserEnum } = require("../../user-manager/entities/user.enum");
const hasAccess = require("../../../middlewares/hasAccess");

let productControler = new ProductControler();
module.exports = {
  "/products": {
    POST: {
      function: productControler.createProduct,
      middlewares: [dataParser,isAuthenticate,Validator('product'),hasAccess],
      roles:[UserEnum.SUPPORT]
    },
    GET: {
      function: productControler.getAll,
      middlewares: [dataParser,isAuthenticate,hasAccess],
      roles:[UserEnum.ADMIN,UserEnum.SUPER_ADMIN]

    },
  },
  "/products/users": {
    GET: {
      function: productControler.findByRole,
      middlewares: [dataParser, isAuthenticate,hasAccess],
      roles:[UserEnum.EMPLOYE,UserEnum.SUPPORT]
    },
  },
};
