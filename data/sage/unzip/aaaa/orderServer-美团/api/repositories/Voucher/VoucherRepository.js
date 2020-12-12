"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const moment = require("moment");
class VoucherRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.Voucher, transaction);
    }
    async findById(id) {
        try {
            return await this.findOne({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async findByNumber(number) {
        try {
            return await this.findOne({ number });
        }
        catch (error) {
            throw error;
        }
    }
    async findByTypeAndNumber(type, number) {
        try {
            return await this.findOne({ type, number });
        }
        catch (error) {
            throw error;
        }
    }
    async findByTypeOrUser(type, userId, startDate, endDate, offset, limit) {
        try {
            let where = {};
            let option = { order: [['createdAt', 'DESC']] };
            if (type || type === 0) {
                where.type = type;
            }
            if (userId) {
                where.maker = userId;
            }
            if (startDate && endDate) {
                where.createdAt = {
                    $gte: startDate,
                    $lte: endDate
                };
            }
            else if (startDate) {
                where.createdAt = {
                    $gte: startDate
                };
            }
            else if (endDate) {
                where.createdAt = {
                    $lte: endDate
                };
            }
            if (offset) {
                option.offset = offset;
            }
            if (limit) {
                option.limit = limit;
            }
            return await this.find(where, option);
        }
        catch (error) {
            throw error;
        }
    }
    async findRefundById(soldVoucherId) {
        try {
            if (!models_1.models.Voucher.associations.soldRefundVoucher) {
                models_1.models.Voucher.belongsTo(models_1.models.SoldRefundVoucher, { foreignKey: 'id', targetKey: 'refundVoucherId', as: 'soldRefundVoucher', constraints: false });
            }
            return await this.find({}, {
                include: [{
                        model: models_1.models.SoldRefundVoucher,
                        as: 'soldRefundVoucher',
                        where: {
                            soldVoucherId
                        }
                    }]
            });
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucher(voucher) {
        try {
            voucher.daily = Number(moment().format('YYYYMMDD'));
            voucher.monthly = Number(moment().format('YYYYMM'));
            voucher.annual = Number(moment().format('YYYY'));
            voucher.auditTime = moment().format('YYYY-MM-DD HH:mm:ss');
            let createdVoucher = await this.create(voucher);
            return createdVoucher;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VoucherRepository = VoucherRepository;
