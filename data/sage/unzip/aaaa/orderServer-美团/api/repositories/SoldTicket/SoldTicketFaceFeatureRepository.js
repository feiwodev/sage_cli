"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class SoldTicketFaceFeatureRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SoldTicketFace, transaction);
    }
    async insertSoldTicketFaceFeature(soldTicketFaceFeature) {
        try {
            return await this.create(soldTicketFaceFeature);
        }
        catch (error) {
            throw error;
        }
    }
    async insertSoldTicketFaceFeatureList(soldTicketFaceFeatureList) {
        try {
            return await this.bulkCreate(soldTicketFaceFeatureList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SoldTicketFaceFeatureRepository = SoldTicketFaceFeatureRepository;
