"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class OrderVoucherRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.OrderVoucher, transaction);
    }
    async findOrderVoucher(orderId) {
        try {
            return await this.findOne({ orderId });
        }
        catch (error) {
            throw error;
        }
    }
    async createOrderVoucher(orderVoucher) {
        try {
            return await this.create(orderVoucher);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OrderVoucherRepository = OrderVoucherRepository;
