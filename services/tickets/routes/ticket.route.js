const dataParser = require('strict-data-parser');
const { UserEnum } = require('~/services/user-manager/entities/user.enum');
const TicketController = require('~/services/tickets/controller/ticket.controller');
const isAuthenticate = require('~/middlewares/isAuthenticate');
const Validator = require('alfavalidator');
const ticketSchema = require('~/validators/ticket.schema');
const isAccess = require('~/middlewares/isAccess');
const ticketController =new TicketController()


module.exports = {
    "/tickets": {
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
  };