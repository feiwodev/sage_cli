"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const moment = require("moment");
class CrowdKindDaySumRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.CrowdKindDaySum, transaction);
    }
    async findByDay(crowdKindId, createdAt) {
        try {
            return await this.findOne({ crowdKindId, daily: moment(createdAt || new Date()).format('YYYYMMDD') });
        }
        catch (error) {
            throw error;
        }
    }
    async updateDaySum(crowdKindId, quantity, amount, createdAt) {
        try {
            await this.update({
                quantity,
                amount
            }, {
                crowdKindId,
                daily: moment(createdAt || new Date()).format('YYYYMMDD')
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async createDaySum(crowdKindId, quantity, amount, createdAt) {
        try {
            return await this.create({
                crowdKindId,
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
exports.CrowdKindDaySumRepository = CrowdKindDaySumRepository;
