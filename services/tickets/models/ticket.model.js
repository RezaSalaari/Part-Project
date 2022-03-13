const orm = require("~/index");
const Responses = require("~/config/response");
const response = new Responses();

module.exports = class TicketModel {
  async save(req, res) {
    const product = await orm.alfaOrm.find("products", "id", req.data.itemId);
   
    if (product.rows && product.rows.length) {
      const hasAccess = product.rows.find(
        (x) => x.assigned_to == req.user.user.id
      );

      if (hasAccess) {
       req.data.userId = req.user.user.id;
        return await orm.alfaOrm.save(req.data, "tickets");
      } else {
        return response.Response_400_Data(req, res, {
          message: "you are not Owned the this Product",
        });
      }
    }
  }
};
