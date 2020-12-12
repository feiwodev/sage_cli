"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class PrintTicketSeqNoRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.PrintTicketSeqNo, transaction);
    }
    async findSeqNo(productId, salesWinId) {
        try {
            const printTicketSeqNo = await this.findOne({
                productId,
                salesWinId
            });
            if (printTicketSeqNo) {
                return Number(printTicketSeqNo.seqNo) + 1;
            }
            else {
                return 1;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async updateSeqNo(productId, salesWinId, seqNo, endId) {
        try {
            let printTicketSeqNo = await this.findOne({
                productId,
                salesWinId
            });
            if (printTicketSeqNo) {
                if (endId && endId > (Number(printTicketSeqNo.seqNo) + seqNo)) {
                    seqNo = endId;
                }
                else {
                    seqNo = Number(printTicketSeqNo.seqNo) + seqNo;
                }
                await this.update({
                    seqNo: seqNo
                }, {
                    productId,
                    salesWinId
                });
            }
            else {
                if (endId && endId > seqNo) {
                    seqNo = endId;
                }
                await this.create({
                    productId,
                    salesWinId,
                    seqNo
                });
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.PrintTicketSeqNoRepository = PrintTicketSeqNoRepository;
