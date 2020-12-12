"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class CheckTicketLogRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.CheckTicketLog, transaction);
    }
    async findByNumber(number) {
        try {
            return await this.findOne({
                $or: [{
                        ticketNo: number
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
    async findListByNumber(number) {
        try {
            return await this.find({
                $or: [{
                        ticketNo: number
                    }, {
                        idCard: number
                    }, {
                        uniqueId: number
                    }]
            }, {
                order: [['createdAt', 'DESC']],
                limit: 100
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findByVoucherDetailTicketId(voucherDetailTicketId) {
        try {
            return await this.find({ voucherDetailTicketId });
        }
        catch (error) {
            throw error;
        }
    }
    async findByVoucherDetailTicketIdAndNumber(voucherDetailTicketId, number) {
        try {
            return await this.find({
                voucherDetailTicketId,
                $or: [{
                        ticketNo: number
                    }, {
                        idCard: number
                    }, {
                        uniqueId: number
                    }]
            }, {
                order: [['createdAt', 'DESC']],
                limit: 100
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CheckTicketLogRepository = CheckTicketLogRepository;
