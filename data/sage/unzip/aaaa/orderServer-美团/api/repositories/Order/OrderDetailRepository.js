"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class OrderDetailRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.OrderDetail, transaction);
    }
    async findByOrderId(orderId) {
        try {
            return await this.find({ orderId });
        }
        catch (error) {
            throw error;
        }
    }
    async createOrderDetail(orderDetail) {
        try {
            return await this.create(orderDetail);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OrderDetailRepository = OrderDetailRepository;
