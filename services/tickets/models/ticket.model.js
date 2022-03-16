const orm = require("~/index");
const Responses = require("~/config/response");
const {
  ticketPriorityEnum,
} = require("~/services/tickets/entities/ticket-priority.enum");
const { Error_403, Error_404 } = require('~/constant/errors');
const { UserEnum } = require("~/services/user-manager/entities/user.enum");
const { TicketStatusEnum } = require("~/services/tickets/entities/ticket-status.enum");
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
            creator: req.user.user.role == UserEnum.SUPPORT ? 'SUPPORT' : 'EMPLOYEE'
          };
          return await orm.alfaOrm.save(commentDto, "comments");
        }
      } else {
        throw new Error_403("this user is not owned the product");
      }
    }
  }

  async filter(req, res) {

    let query =
      `SELECT 
    subject,content,category,liked,status,comments.created_at
     FROM comments LEFT JOIN tickets ON tickets.id = comments.ticketId`;
    let conditions = [];
    const role = req.user.user.role;

    if (req.data.fromDate && req.data.toDate)
      conditions.push(this._FilterByBetweenDates(req.data.fromDate, req.data.toDate));
    else if (req.data.fromDate)
      conditions.push(this._FilterDateByMoreThanOrEqual(req.data.fromDate));
    else if (req.data.toDate)
      conditions.push(this._FilterDateByLessThanOrEqual(req.data.toDate));

    if (role == UserEnum.EMPLOYE) {
      conditions.push(`userId = ${req.user.user.id}`);
    }
    if (role == UserEnum.SUPPORT) {
      if (req.data.assigned_to) {
        conditions.push(`userId = ${req.data.assigned_to}`)
      }
      if (req.data.assigned_operator) {
        conditions.push(`operator = ${req.user.user.id}`)
      }
    }

    if (req.data.status) {
      conditions.push(`status = '${req.data.status}'`);
    }
    if (conditions.length > 0) {
      query += (' WHERE ' + conditions.join(' AND '));
    }
    return await orm.alfaOrm.query(query);
  }


  async assignToOperator(req, res) {
    let ticket = await orm.alfaOrm.find('tickets', 'id', req.data.ticketId);

    if (ticket && ticket.rows && ticket.rows.length) {
      const withoutOperator = ticket.rows.find(item => item.operator == undefined);
      const notSolved = ticket.rows.find(item => item.solved == false)
      if (withoutOperator && notSolved) {
        const query =
          `UPDATE tickets SET
         operator = ${req.user.user.id},
         status = '${TicketStatusEnum.IN_PROGRESS}'
         where id = ${ticket.rows[0].id} RETURNING *`

        return await orm.alfaOrm.query(query);
      } else {
        throw new Error_403('This ticket has already been resolved or has an operator')
      }
    } else {
      throw new Error_404('not Found Ticket')
    }

  }

  async reply(req, res) {
    const ticket = await orm.alfaOrm.find('tickets', 'id', req.data.ticketId);
    if (ticket && ticket.rows && ticket.rows.length) {

      const user = req.user.user
      const canReply = ticket.rows.some(item => item.operator == user.id || item.userId == user.id)
      const notSolved = ticket.rows.find(x => x.solved == false);
      if (canReply && notSolved) {
        const commentDto = {
          subject: req.data.subject,
          content: req.data.content,
          liked: req.data.liked || false,
          ticketId: ticket.rows[0].id,
          creator: req.user.user.role == UserEnum.SUPPORT ? 'SUPPORT' : 'EMPLOYEE'
        }
        return await orm.alfaOrm.save(commentDto, "comments");
      }
      throw new Error_403('ticket answered or not Access User')
    }
    throw new Error_404('not Found Ticket ')
  }

  _FilterDateByLessThanOrEqual(toDate) {
    return (`comments.created_at <= '${toDate}' `);
  }

  _FilterDateByMoreThanOrEqual(fromDate) {
    return (`comments.created_at >= '${fromDate}' `);
  }

  _FilterByBetweenDates(fromDate, toDate) {
    return (`comments.created_at BETWEEN '${fromDate}' AND '${toDate}' `);
  }

};
