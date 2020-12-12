"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class BusinessComposePriceRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.BusinessComposePrice, transaction);
    }
    async findByTicket(ticketId, businessPriceId) {
        try {
            return await this.findOne({ ticketId, businessPriceId });
        }
        catch (error) {
            throw error;
        }
    }
    async findByTickets(ticketIds) {
        try {
            return await this.find({ ticketId: ticketIds });
        }
        catch (error) {
            throw error;
        }
    }
    async findList() {
        try {
            return await this.find();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BusinessComposePriceRepository = BusinessComposePriceRepository;
