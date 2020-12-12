"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class ProductComposeRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.ProductCompose, transaction);
    }
    async findListByProductId(productId) {
        try {
            let productComposeList = await this.find({ productId });
            return productComposeList;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductComposeRepository = ProductComposeRepository;
