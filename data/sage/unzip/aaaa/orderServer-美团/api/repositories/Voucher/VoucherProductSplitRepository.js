"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class VoucherProductSplitRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VoucherProductSplit, transaction);
    }
    async findByVoucherDetailId(voucherDetailId) {
        try {
            return await this.find({ voucherDetailId });
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherProductSplit(voucherProductSplit) {
        try {
            return await this.create(voucherProductSplit);
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherProductSplitList(voucherProductSplitList) {
        try {
            return await this.bulkCreate(voucherProductSplitList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VoucherProductSplitRepository = VoucherProductSplitRepository;
