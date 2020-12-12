"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class BusinessPriceRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.BusinessPrice, transaction);
    }
    async findById(id) {
        try {
            return await this.findOne({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async findByIds(ids) {
        try {
            return await this.find({ id: ids });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BusinessPriceRepository = BusinessPriceRepository;
