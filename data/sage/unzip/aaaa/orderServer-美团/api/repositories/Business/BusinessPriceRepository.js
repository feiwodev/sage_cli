"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class BusinessPriceRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.BusinessPrice, transaction);
    }
    async findUseBusinessPricesIds() {
        try {
            const businessPriceIds = await this.find({ isUse: true }, {
                attributes: ['id']
            });
            return businessPriceIds;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BusinessPriceRepository = BusinessPriceRepository;
