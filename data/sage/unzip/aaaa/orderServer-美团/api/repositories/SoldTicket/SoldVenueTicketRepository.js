"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class SoldVenueTicketRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SoldVenueTicket, transaction);
    }
    async insertSoldVenueTicket(soldVenueTicket) {
        try {
            return await this.create(soldVenueTicket);
        }
        catch (error) {
            throw error;
        }
    }
    async insertSoldVenueTicketList(soldVenueTicketList) {
        try {
            return await this.bulkCreate(soldVenueTicketList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SoldVenueTicketRepository = SoldVenueTicketRepository;
