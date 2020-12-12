"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class OrderDetailTicketRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.OrderDetailTicket, transaction);
    }
    async findByOrderDetailId(orderDetailId) {
        try {
            return await this.findOne({ orderDetailId });
        }
        catch (error) {
            throw error;
        }
    }
    async createOrderDetailTicket(orderDetailTicket) {
        try {
            return await this.create(orderDetailTicket);
        }
        catch (error) {
            throw error;
        }
    }
    async updateOrderDetailTicket(orderDetailTicket) {
        try {
            return await this.update(orderDetailTicket);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OrderDetailTicketRepository = OrderDetailTicketRepository;
