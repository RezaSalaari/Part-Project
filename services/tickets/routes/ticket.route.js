const dataParser = require("strict-data-parser");
const { UserEnum } = require("~/services/user-manager/entities/user.enum");
const TicketController = require("~/services/tickets/controller/ticket.controller");
const isAuthenticate = require("~/middlewares/isAuthenticate");
const Validator = require("alfavalidator");
const ticketSchema = require("~/validators/ticket.schema");
const isAccess = require("~/middlewares/isAccess");
const ticketFilterSchema = require("~/validators/ticket-filter.schema");
const ticketAssignToSupport = require("~/validators/ticket-assign-To-support");
const replyTicket = require("~/validators/reply-ticket");
const ticketController = new TicketController();

module.exports = {
  "/tickets/new": {
    POST: {
      function: ticketController.save,
      middlewares: [
        dataParser,
        isAuthenticate,
        Validator(ticketSchema),
        isAccess,
      ],
      roles: [UserEnum.EMPLOYE],
    },
  },
  "/tickets/filter": {
    POST: {
      function: ticketController.filter,
      middlewares: [
        dataParser,
        isAuthenticate,
        Validator(ticketFilterSchema),
        isAccess,
      ],
      roles: [UserEnum.EMPLOYE, UserEnum.SUPPORT],
    },
  },
  "/tickets/support": {
    PUT: {
      function: ticketController.assignToOperator,
      middlewares: [
        dataParser,
        isAuthenticate,
        Validator(ticketAssignToSupport),
        isAccess,
      ],
      roles: [UserEnum.SUPPORT],
    },
  },
  "/tickets/reply": {
    POST: {
      function: ticketController.reply,
      middlewares: [
        dataParser,
        isAuthenticate,
        Validator(replyTicket),
        isAccess,
      ],
      roles: [UserEnum.SUPPORT, UserEnum.EMPLOYE],
    },
  },
  "/tickets/completed": {
    PUT: {
      function: ticketController.completedTicket,
      middlewares: [dataParser,isAuthenticate,isAccess],
      roles: [UserEnum.EMPLOYE],
    },
  },
};
