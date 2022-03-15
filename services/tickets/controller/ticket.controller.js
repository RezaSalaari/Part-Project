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
        return response.Response_403_Data(req, res, {
          message: "this user is not owned the product:",
        });
    }
  }

  async filter(req, res) {
    const tickets = await ticketModel.filter(req, res);
    return response.Response_200_Data(req, res, { ...tickets.rows })
  }

  async assignToOperator(req, res) {
    try {
      const ticket = await ticketModel.assignToOperator(req, res);
      return response.Response_200_Data(req,res,{...ticket.rows})
    } catch (error) {
      if (error.statusCode == 404) return response.Response_404_Data(req, res, { message: error.message });
      if (error.statusCode == 403) return response.Response_403_Data(req, res, { message: error.message });
    }
  }
};
