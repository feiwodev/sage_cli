"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class SalesSiteRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SalesSite, transaction);
    }
    async findById(id) {
        try {
            return await this.findOne({ id });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SalesSiteRepository = SalesSiteRepository;
