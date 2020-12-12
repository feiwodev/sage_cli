"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class SoldTicketDetailRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SoldTicketDetail, transaction);
    }
    async insertSoldTicketDetail(soldTicketDetail) {
        try {
            return await this.create(soldTicketDetail);
        }
        catch (error) {
            throw error;
        }
    }
    async insertSoldTicketDetailList(soldTicketDetailList) {
        try {
            return await this.bulkCreate(soldTicketDetailList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SoldTicketDetailRepository = SoldTicketDetailRepository;
