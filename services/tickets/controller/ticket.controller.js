const TicketModel = require("~/services/tickets/models/ticket.model");
const Responses = require("~/config/response");
const response = new Responses();
const ticketModel = new TicketModel();

module.exports = class TicketController {
  async save(req, res) {
    const ticket = await ticketModel.save(req, res);
    return response.Response_200_Data(req, res, { data: ticket.rows });
  }
};
