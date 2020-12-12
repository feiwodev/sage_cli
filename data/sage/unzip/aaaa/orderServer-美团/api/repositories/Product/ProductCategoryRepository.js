"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class ProductCategoryRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.ProductCategory, transaction);
    }
    async findById(id) {
        try {
            let productCategory = await this.findOne({ id });
            return productCategory;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductCategoryRepository = ProductCategoryRepository;
