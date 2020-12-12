"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class NumberRulesRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.ProductCategory, transaction);
    }
    async findById(id) {
        try {
            let numberRule = await this.findOne({ id });
            return numberRule;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.NumberRulesRepository = NumberRulesRepository;
