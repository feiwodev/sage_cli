"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class VoucherDetailTicketRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VoucherDetailTicket, transaction);
    }
    async findById(id) {
        try {
            if (!models_1.models.VoucherDetailTicket.associations.voucherDetail) {
                models_1.models.VoucherDetailTicket.belongsTo(models_1.models.VoucherDetail, { foreignKey: 'voucherDetailId', targetKey: 'id', as: 'voucherDetail', constraints: false });
            }
            if (!models_1.models.VoucherDetail.associations.voucher) {
                models_1.models.VoucherDetail.belongsTo(models_1.models.Voucher, { foreignKey: 'voucherId', targetKey: 'id', as: 'voucher', constraints: false });
            }
            return await this.findOne({ id }, {
                include: [{
                        model: models_1.models.VoucherDetail,
                        as: 'voucherDetail',
                        include: [{
                                model: models_1.models.Voucher,
                                as: 'voucher'
                            }]
                    }]
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findByVoucherDetailId(voucherDetailId) {
        try {
            return await this.findOne({ voucherDetailId });
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherDetailTicket(voucherDetailTicket) {
        try {
            return await this.create(voucherDetailTicket);
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherDetailTicketList(voucherDetailTicketList) {
        try {
            return await this.bulkCreate(voucherDetailTicketList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VoucherDetailTicketRepository = VoucherDetailTicketRepository;
