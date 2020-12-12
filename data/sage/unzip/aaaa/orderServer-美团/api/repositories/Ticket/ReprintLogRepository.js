"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class ReprintLogRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.ReprintLog, transaction);
    }
    async insertReprintLog(reprintLog) {
        try {
            let createdReprintLog = await this.create(reprintLog);
            return createdReprintLog;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ReprintLogRepository = ReprintLogRepository;
