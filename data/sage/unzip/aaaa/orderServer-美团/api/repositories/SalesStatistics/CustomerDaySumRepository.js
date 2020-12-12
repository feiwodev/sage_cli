"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const moment = require("moment");
class CustomerDaySumRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.CustomerDaySum, transaction);
    }
    async findByDay(customerId, createdAt) {
        try {
            return await this.findOne({ customerId, daily: moment(createdAt || new Date()).format('YYYYMMDD') });
        }
        catch (error) {
            throw error;
        }
    }
    async updateDaySum(customerId, quantity, amount, createdAt) {
        try {
            await this.update({
                quantity,
                amount
            }, {
                customerId,
                daily: moment(createdAt || new Date()).format('YYYYMMDD')
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async createDaySum(customerId, quantity, amount, createdAt) {
        try {
            return await this.create({
                customerId,
                quantity,
                amount,
                annual: moment(createdAt || new Date()).format('YYYY'),
                monthly: moment(createdAt || new Date()).format('YYYYMM'),
                daily: moment(createdAt || new Date()).format('YYYYMMDD')
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CustomerDaySumRepository = CustomerDaySumRepository;
