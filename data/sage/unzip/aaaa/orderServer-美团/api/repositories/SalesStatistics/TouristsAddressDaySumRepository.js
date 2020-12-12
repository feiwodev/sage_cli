"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const moment = require("moment");
class TouristsAddressDaySumRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.TouristsAddressDaySum, transaction);
    }
    async findByDay(touristsAddressId, createdAt) {
        try {
            return await this.findOne({ touristsAddressId, daily: moment(createdAt || new Date()).format('YYYYMMDD') });
        }
        catch (error) {
            throw error;
        }
    }
    async updateDaySum(touristsAddressId, quantity, amount, createdAt) {
        try {
            await this.update({
                quantity,
                amount
            }, {
                touristsAddressId,
                daily: moment(createdAt || new Date()).format('YYYYMMDD')
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async createDaySum(touristsAddressId, quantity, amount, createdAt) {
        try {
            return await this.create({
                touristsAddressId,
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
exports.TouristsAddressDaySumRepository = TouristsAddressDaySumRepository;
