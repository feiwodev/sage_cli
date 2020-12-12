"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class VoucherDetailPersonRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VoucherDetailPerson, transaction);
    }
    async findByVoucherDetail(voucherDetailId) {
        try {
            return await this.find({ voucherDetailId });
        }
        catch (error) {
            throw error;
        }
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
            return await this.findOne({
                $or: [{
                        phone: number
                    }, {
                        idCard: number
                    }, {
                        uniqueId: number
                    }]
            }, {
                order: [['createdAt', 'DESC']]
            });
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherDetailPerson(voucherDetailPerson) {
        try {
            return await this.create(voucherDetailPerson);
        }
        catch (error) {
            throw error;
        }
    }
    async insertVoucherDetailPersonList(voucherDetailPersonList) {
        try {
            return await this.bulkCreate(voucherDetailPersonList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VoucherDetailPersonRepository = VoucherDetailPersonRepository;
