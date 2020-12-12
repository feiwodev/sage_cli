"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const _ = require("lodash");
const moment = require("moment");
class OrderRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.Orders, transaction);
    }
    async generateSerialNumber(type, salesWinId, userId) {
        try {
            let number = await this.max('number', {
                type: type,
                salesWinId: salesWinId,
                maker: userId,
                createdAt: {
                    $gte: moment().format('YYYY-MM-DD') + ' 00:00:00',
                    $lte: moment().format('YYYY-MM-DD') + ' 23:59:59'
                }
            });
            let serialPrefix = _.padStart(type, 2, '0') +
                moment().format('YYMMDD') +
                _.padStart(salesWinId, 3, '0') +
                _.padStart(userId, 3, '0');
            if (number) {
                number = Number(number.replace(serialPrefix, '')) + 1;
                number = serialPrefix + _.padStart(number, 6, '0');
            }
            else {
                number = serialPrefix + _.padStart('1', 6, '0');
            }
            return number;
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            return await this.findOne({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async findByNumber(number) {
        try {
            return await this.findOne({ number });
        }
        catch (error) {
            throw error;
        }
    }
    async findBySyncId(syncId) {
        try {
            return await this.findOne({ syncId });
        }
        catch (error) {
            throw error;
        }
    }
    async createOrder(order) {
        try {
            return await this.create(order);
        }
        catch (error) {
            throw error;
        }
    }
    async updateOrder(order) {
        try {
            return await this.update(order);
        }
        catch (error) {
            throw error;
        }
    }
    async updateOrderStatus(id, status) {
        try {
            return await this.update({ status }, { id });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OrderRepository = OrderRepository;
