"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const _ = require("lodash");
class SalesWinRightRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SalesWinRight, transaction);
    }
    async findBusinessPriceIds(salesWinId) {
        try {
            const salesWinRights = await this.find({ salesWinId }, {
                attributes: ['businessPriceId']
            });
            let businessPriceIds = null;
            if (salesWinRights && salesWinRights.length) {
                businessPriceIds = _.map(salesWinRights, 'businessPriceId');
            }
            return businessPriceIds;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SalesWinRightRepository = SalesWinRightRepository;
