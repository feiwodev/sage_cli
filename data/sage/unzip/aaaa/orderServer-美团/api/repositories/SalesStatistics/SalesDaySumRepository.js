"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const moment = require("moment");
class SalesDaySumRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SalesDaySum, transaction);
    }
    async findByHour(salesWinId, businessId, productId, createdAt) {
        try {
            return await this.findOne({
                salesWinId,
                businessId,
                productId,
                daily: moment(createdAt || new Date()).format('YYYYMMDD'),
                hourly: moment(createdAt || new Date()).format('HH')
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateDayHour(salesWinId, businessId, productId, quantity, amount, createdAt) {
        try {
            await this.update({
                quantity,
                amount
            }, {
                salesWinId,
                businessId,
                productId,
                daily: moment(createdAt || new Date()).format('YYYYMMDD'),
                hourly: moment(createdAt || new Date()).format('HH')
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async createDayHour(salesWinId, businessId, productId, quantity, amount, createdAt) {
        try {
            return await this.create({
                salesWinId,
                businessId,
                productId,
                quantity,
                amount,
                annual: moment(createdAt || new Date()).format('YYYY'),
                monthly: moment(createdAt || new Date()).format('YYYYMM'),
                daily: moment(createdAt || new Date()).format('YYYYMMDD'),
                hourly: moment(createdAt).format('HH')
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SalesDaySumRepository = SalesDaySumRepository;
