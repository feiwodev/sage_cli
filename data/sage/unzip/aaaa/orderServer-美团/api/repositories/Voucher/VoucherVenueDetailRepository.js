"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class VoucherVenueDetailRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VoucherVenueDetail, transaction);
    }
    async findByVoucherDetail(voucherDetailId) {
        try {
            return await this.findOne({ voucherDetailId });
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherVenueDetail(voucherVenueDetail) {
        try {
            return await this.create(voucherVenueDetail);
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherVenueDetailList(voucherVenueDetailList) {
        try {
            return await this.bulkCreate(voucherVenueDetailList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VoucherVenueDetailRepository = VoucherVenueDetailRepository;
