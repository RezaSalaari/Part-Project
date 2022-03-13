const TicketModel = require("~/services/tickets/models/ticket.model");
const Responses = require("~/config/response");
const response = new Responses();
const ticketModel = new TicketModel();

module.exports = class TicketController {
  async save(req, res) {
    try {
      let ticket = await ticketModel.save(req, res);
      ticket = { ...ticket.rows };
      return response.Response_200_Data(req, res, ticket);
    } catch (error) {
      if (error.statusCode === 403)
        return response.Response_400_Data(req, res, {
          message: "this user is not owned the product:",
        });
    }
  }
};
