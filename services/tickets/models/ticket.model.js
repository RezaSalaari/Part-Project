const orm = require("~/index");
const Responses = require("~/config/response");
const {
  ticketPriorityEnum,
} = require("~/services/tickets/entities/ticket-priority.enum");
const { Error_403 } = require("~/error/errors");
const response = new Responses();

module.exports = class TicketModel {
  async save(req, res) {
    const product = await orm.alfaOrm.find("products", "id", req.data.itemId);

    if (product.rows && product.rows.length) {
      const hasAccess = product.rows.find(
        (x) => x.assigned_to == req.user.user.id
      );

      if (hasAccess) {
        const ticketDto = {
          itemId: req.data.itemId,
          priority: req.data.priority || ticketPriorityEnum.NORMAL,
          userId: req.user.user.id,
          solved: req.data.solved || false,
        };
        const ticket = await orm.alfaOrm.save(ticketDto, "tickets");
        if (ticket.rows && ticket.rows.length) {
          const commentDto = {
            subject: req.data.subject,
            content: req.data.content,
            liked: req.data.liked || false,
            ticketId: ticket.rows[0].id,
          };
          return await orm.alfaOrm.save(commentDto, "comments");
        }
      } else {
        throw new Error_403("this user is not owned the product");
      }
    }
  }
};
