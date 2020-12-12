"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class SoldTicketRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.SoldTicket, transaction);
    }
    async findByNumber(number) {
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
                order: [['createdAt', 'DESC']]
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findByTicketNo(ticketNo) {
        try {
            return await this.findOne({ ticketNo });
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
    async insertSoldTicket(soldTicket) {
        try {
            return await this.create(soldTicket);
        }
        catch (error) {
            throw error;
        }
    }
    async insertSoldTicketList(soldTicketList) {
        try {
            return await this.bulkCreate(soldTicketList);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SoldTicketRepository = SoldTicketRepository;
