"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class SoldTicketFingerprintRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SoldTicketFingerprint, transaction);
    }
    async insertSoldTicketFingerprint(soldTicketFingerprint) {
        try {
            return await this.create(soldTicketFingerprint);
        }
        catch (error) {
            throw error;
        }
    }
    async insertSoldTicketFingerprintList(soldTicketFingerprintList) {
        try {
            return await this.bulkCreate(soldTicketFingerprintList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SoldTicketFingerprintRepository = SoldTicketFingerprintRepository;
