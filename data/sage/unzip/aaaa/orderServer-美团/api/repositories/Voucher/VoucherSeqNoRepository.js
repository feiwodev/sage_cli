"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
const moment = require("moment");
class VoucherSeqNoRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.VoucherSeqNo, transaction);
    }
    async findSeqNo(type, salesWinId, userId) {
        try {
            let seqNo = 1;
            const voucherSeqNo = await this.findOne({ voucherType: type, maker: userId, salesWinId });
            if (voucherSeqNo) {
                if (moment(voucherSeqNo.updatedAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
                    seqNo = voucherSeqNo.seqNo;
                }
                else {
                    await this.update({
                        seqNo: 1
                    }, {
                        voucherType: type,
                        maker: userId,
                        salesWinId
                    });
                }
            }
            else {
                await this.create({
                    voucherType: type,
                    salesWinId: salesWinId,
                    maker: userId,
                    seqNo: 1
                });
            }
            return seqNo;
        }
        catch (error) {
            throw error;
        }
    }
    async updateSeqNo(type, salesWinId, userId) {
        try {
            let voucherSeqNo = await this.findOne({
                voucherType: type,
                maker: userId,
                salesWinId
            });
            if (voucherSeqNo) {
                await this.update({
                    seqNo: Number(voucherSeqNo.seqNo) + 1
                }, {
                    voucherType: type,
                    maker: userId,
                    salesWinId
                });
            }
            else {
                await this.create({
                    voucherType: type,
                    salesWinId: salesWinId,
                    maker: userId,
                    seqNo: 1
                });
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VoucherSeqNoRepository = VoucherSeqNoRepository;
