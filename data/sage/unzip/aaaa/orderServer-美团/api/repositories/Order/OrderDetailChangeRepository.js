"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class OrderDetailChangeRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.OrderDetailChange, transaction);
    }
    async findByOrderDetailId(orderDetailId) {
        try {
            return await this.findOne({ orderDetailId });
        }
        catch (error) {
            throw error;
        }
    }
    async createOrderDetailChange(orderDetailChange) {
        try {
            return await this.create(orderDetailChange);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OrderDetailChangeRepository = OrderDetailChangeRepository;
