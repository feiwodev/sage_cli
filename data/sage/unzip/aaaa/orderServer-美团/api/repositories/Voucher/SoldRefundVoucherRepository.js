"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class SoldRefundVoucherRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SoldRefundVoucher, transaction);
    }
    async findRefundVoucher(soldVoucherId) {
        try {
            return await this.find({ soldVoucherId });
        }
        catch (error) {
            throw error;
        }
    }
    async insertRefundVoucher(refundVoucher) {
        try {
            return await this.create(refundVoucher);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SoldRefundVoucherRepository = SoldRefundVoucherRepository;
