"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class AccessTicketSetRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.AccessTicketSet, transaction);
    }
    async findListByBusinessTicket(businessTicketId) {
        try {
            return await this.find({ businessTicketId });
        }
        catch (error) {
            throw error;
        }
    }
    async findListByBusinessTickets(businessTicketIds) {
        try {
            return await this.find({ businessTicketId: businessTicketIds });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AccessTicketSetRepository = AccessTicketSetRepository;
