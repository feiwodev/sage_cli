"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class VoucherDetailRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VoucherDetail, transaction);
    }
    async findById(id) {
        try {
            if (!models_1.models.VoucherDetail.associations.voucher) {
                models_1.models.VoucherDetail.belongsTo(models_1.models.Voucher, { foreignKey: 'voucherId', targetKey: 'id', as: 'voucher', constraints: false });
            }
            return await this.findOne({ id }, {
                include: [{
                        model: models_1.models.Voucher,
                        as: 'voucher'
                    }]
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findByVoucher(voucherId) {
        try {
            return await this.find({ voucherId });
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherDetail(voucherDetail) {
        try {
            return await this.create(voucherDetail);
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherDetailList(voucherDetailList) {
        try {
            return await this.bulkCreate(voucherDetailList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VoucherDetailRepository = VoucherDetailRepository;
