"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../../middleware/log");
const service_1 = require("../../../lib/service");
const Repository_1 = require("../../repositories/utils/Repository");
const VoucherDetailRepository_1 = require("../../repositories/Voucher/VoucherDetailRepository");
const VoucherDetailTicketRepository_1 = require("../../repositories/Voucher/VoucherDetailTicketRepository");
const VoucherProductSplitRepository_1 = require("../../repositories/Voucher/VoucherProductSplitRepository");
const SoldTicketRepository_1 = require("../../repositories/SoldTicket/SoldTicketRepository");
const SoldRefundVoucherRepository_1 = require("../../repositories/Voucher/SoldRefundVoucherRepository");
const ForcedRefundRightRepository_1 = require("../../repositories/BusniessRight/ForcedRefundRightRepository");
const VoucherEntity_1 = require("../../entities/Voucher/VoucherEntity");
const VoucherService_1 = require("./Voucher/VoucherService");
const VoucherDetailService_1 = require("./Voucher/VoucherDetailService");
const SoldTicketService_1 = require("./SoldTicket/SoldTicketService");
const BusinessTicketService_1 = require("./BusinessTicket/BusinessTicketService");
const CheckTicketLogService_1 = require("../Access/CheckTicketLogService");
const _ = require("lodash");
const moment = require("moment");
class RefundTicketService {
    constructor() {
    }
    async queryRefundDetail(number) {
        try {
            let refundDetailList = [];
            const soldTicketList = await this.soldTicketService.getSoldTicketWithNumber(number);
            for (let soldTicket of soldTicketList) {
                if (soldTicket.state === 0) {
                    const voucherDetailTicket = await this.voucherDetailService.getVoucherDetailTicketWithId(soldTicket.voucherDetailTicketId);
                    if (voucherDetailTicket) {
                        const voucherDetail = await this.voucherDetailService.getVoucherDetailWithId(voucherDetailTicket.voucherDetailId);
                        const refundDetailEntity = await this.convertRefundDetailEntity(voucherDetail);
                        refundDetailList.push(refundDetailEntity);
                        return refundDetailList;
                    }
                }
            }
            const checkTicketLog = await this.checkTicketLogService.getCheckTicketLogWithNumber(number);
            if (checkTicketLog) {
                const voucherDetailTicket = await this.voucherDetailService.getVoucherDetailTicketWithId(checkTicketLog.voucherDetailTicketId);
                if (voucherDetailTicket) {
                    const voucherDetail = await this.voucherDetailService.getVoucherDetailWithId(voucherDetailTicket.voucherDetailId);
                    const refundDetailEntity = await this.convertRefundDetailEntity(voucherDetail);
                    refundDetailList.push(refundDetailEntity);
                    return refundDetailList;
                }
            }
            const voucher = await this.voucherService.getVoucherWithNumber(number);
            if (voucher) {
                let _voucherDetailList = await this.voucherDetailService.getVoucherDetailWithVoucher(voucher.id);
                for (let voucherDetail of _voucherDetailList) {
                    const refundDetailEntity = await this.convertRefundDetailEntity(voucherDetail);
                    refundDetailList.push(refundDetailEntity);
                }
                return refundDetailList;
            }
            const voucherDetailPerson = await this.voucherDetailService.getVoucherDetailPersonWithNumber(number);
            if (voucherDetailPerson) {
                const voucherDetail = await this.voucherDetailService.getVoucherDetailWithId(voucherDetailPerson.voucherDetailId);
                const refundDetailEntity = await this.convertRefundDetailEntity(voucherDetail);
                refundDetailList.push(refundDetailEntity);
                return refundDetailList;
            }
            return refundDetailList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async convertRefundDetailEntity(voucherDetail) {
        try {
            let businessTicket = await this.businessTicketService.getBusinessTicketWithBusinessPriceId(voucherDetail.businessPriceId);
            let voucherDetailTicket = await this.voucherDetailService.getVoucherDetailTicketWithVoucherDetailId(voucherDetail.id);
            let voucher = await this.voucherService.getVoucherWithId(voucherDetail.voucherId);
            let serialPrefix = businessTicket.ticket.product.numberRule.rulesPrefix + businessTicket.ticket.product.code;
            if (businessTicket.ticket.sellWay === 1) {
                serialPrefix += _.padStart(voucher.salesWinId.toString(), 3, '0');
            }
            let serialNoLength = businessTicket.ticket.product.numberRule.serialNoLen;
            let refundDetailEntity = {
                id: voucherDetail.id,
                voucherId: voucher.id,
                voucherNumber: voucher.number,
                businessId: voucher.businessId,
                settlementId: voucher.settlementId,
                productId: voucherDetail.productId,
                crowdKindId: voucherDetail.crowdKindId,
                priceId: voucherDetail.priceId,
                seqNo: voucherDetail.seqNo,
                quantity: voucherDetail.quantity,
                price: voucherDetail.price,
                amount: voucherDetail.amount,
                salesSchemeId: voucherDetail.salesSchemeId,
                businessPriceId: voucherDetail.businessPriceId,
                voucherDetailTicketId: voucherDetailTicket.id,
                startId: Number(voucherDetailTicket.startId),
                endId: Number(voucherDetailTicket.endId),
                startSerial: voucherDetailTicket.startSerial,
                endSerial: voucherDetailTicket.endSerial,
                startDate: moment(voucherDetailTicket.startDate).format('YYYY-MM-DD HH:mm:ss'),
                endDate: moment(voucherDetailTicket.endDate).format('YYYY-MM-DD HH:mm:ss'),
                businessTicketId: businessTicket.id,
                businessTicket: businessTicket,
                productName: businessTicket.ticket.product.name,
                crowdKindName: businessTicket.crowdKind.name,
                priceName: businessTicket.price.name,
                serialPrefix: serialPrefix,
                serialNoLength: serialNoLength,
                ticketNos: []
            };
            for (let i = refundDetailEntity.startId; i <= refundDetailEntity.endId; i++) {
                refundDetailEntity.ticketNos.push(refundDetailEntity.serialPrefix + _.padStart(i.toString(), refundDetailEntity.serialNoLength, '0'));
            }
            return refundDetailEntity;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async filterRefundedDetail(refundDetailList) {
        try {
            const refundTicketNoList = [];
            const refundVoucherList = await this.voucherService.getRefundVoucherWithId(refundDetailList[0].voucherId);
            if (refundVoucherList) {
                for (let refundVoucher of refundVoucherList) {
                    const _refundDetailList = await this.voucherDetailService.getVoucherDetailWithVoucher(refundVoucher.id);
                    for (let refundDetail of _refundDetailList) {
                        const refundDetailTicket = await this.voucherDetailService.getVoucherDetailTicketWithVoucherDetailId(refundDetail.id);
                        if (refundDetailTicket) {
                            const _refundSoldTicketList = await this.soldTicketService.getSoldTicketWithVoucherDetailTicketId(refundDetailTicket.id);
                            _refundSoldTicketList.forEach((o) => {
                                refundTicketNoList.push(o.ticketNo);
                            });
                        }
                    }
                }
            }
            if (refundTicketNoList && refundTicketNoList.length > 0) {
                for (let refundDetail of refundDetailList) {
                    refundDetail.refundTicketNos = [];
                    for (let ticketNo of refundTicketNoList) {
                        if (_.findIndex(refundDetail.ticketNos, (o) => { return o === ticketNo; }) >= 0) {
                            _.remove(refundDetail.ticketNos, (o) => { return o === ticketNo; });
                            refundDetail.refundTicketNos.push(ticketNo);
                            refundDetail.amount -= refundDetail.price;
                            refundDetail.quantity--;
                        }
                    }
                }
            }
            return refundDetailList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async filterExpiredRefundDetail(refundDetailList) {
        try {
            for (let refundDetail of refundDetailList) {
                refundDetail.expiredTicketNos = [];
                if (moment(refundDetail.endDate).isBefore(moment())) {
                    refundDetail.quantity = 0;
                    refundDetail.expiredTicketNos = refundDetail.ticketNos;
                    refundDetail.amount = 0;
                    refundDetail.ticketNos = [];
                }
            }
            return refundDetailList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async filterUsedRefundDetail(refundDetailList) {
        try {
            for (let refundDetail of refundDetailList) {
                const refundDetailTicket = await this.voucherDetailService.getVoucherDetailTicketWithVoucherDetailId(refundDetail.id);
                const checkTicketList = await this.checkTicketLogService.getCheckTicketLogsWithVDTId(refundDetailTicket.id);
                refundDetail.usedTicketNos = [];
                checkTicketList.forEach((o) => {
                    if (_.findIndex(refundDetail.ticketNos, (n) => { return n === o.ticketNo; }) >= 0) {
                        _.remove(refundDetail.ticketNos, (n) => { return n === o.ticketNo; });
                        refundDetail.usedTicketNos.push(o.ticketNo);
                        refundDetail.amount -= refundDetail.price;
                        refundDetail.quantity--;
                    }
                });
            }
            return refundDetailList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getRefundDetail(number, isForcedRefund = false, ticketNos) {
        try {
            let refundDetailList = await this.queryRefundDetail(number);
            if (refundDetailList && refundDetailList.length) {
                refundDetailList = await this.filterRefundedDetail(refundDetailList);
                if (!isForcedRefund) {
                    refundDetailList = await this.filterExpiredRefundDetail(refundDetailList);
                    refundDetailList = await this.filterUsedRefundDetail(refundDetailList);
                }
                if (ticketNos && ticketNos.length) {
                    for (let refundDetail of refundDetailList) {
                        const _ticketNos = _.cloneDeep(refundDetail.ticketNos);
                        refundDetail.amount = 0;
                        refundDetail.quantity = 0;
                        refundDetail.ticketNos = [];
                        for (let ticketNo of ticketNos) {
                            if (_.findIndex(_ticketNos, (o) => { return o === ticketNo; }) >= 0) {
                                refundDetail.ticketNos.push(ticketNo);
                                refundDetail.amount += refundDetail.price;
                                refundDetail.quantity++;
                            }
                        }
                    }
                }
            }
            _.remove(refundDetailList, (o) => {
                return !o.quantity || !o.ticketNos.length;
            });
            if (refundDetailList && refundDetailList.length) {
                for (let refundDetail of refundDetailList) {
                    if (refundDetail.ticketNos.length === 1) {
                        refundDetail.startSerial = refundDetail.endSerial = refundDetail.ticketNos[0];
                        refundDetail.startId = refundDetail.endId = Number(refundDetail.startSerial.replace(refundDetail.serialPrefix, ''));
                    }
                    else if (refundDetail.ticketNos.length > 1) {
                        refundDetail.startSerial = refundDetail.ticketNos[0];
                        refundDetail.endSerial = refundDetail.ticketNos[refundDetail.ticketNos.length - 1];
                        refundDetail.startId = Number(refundDetail.startSerial.replace(refundDetail.serialPrefix, ''));
                        refundDetail.endId = Number(refundDetail.endSerial.replace(refundDetail.serialPrefix, ''));
                    }
                }
            }
            return refundDetailList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getForcedRefundRight(userId) {
        try {
            return await this.forcedRefundRightRepository.findListByUser(userId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async resetSalesTicketData(idOrNumber, ticketNos) {
        try {
            let salesVoucher = await this.voucherService.getVoucherWithId(idOrNumber);
            if (!salesVoucher) {
                salesVoucher = await this.voucherService.getVoucherWithNumber(idOrNumber);
            }
            if (!salesVoucher) {
                throw new Error('销售凭证不存在');
            }
            else {
                if (salesVoucher.type !== VoucherEntity_1.VoucherType.出售 && salesVoucher.type !== VoucherEntity_1.VoucherType.补票) {
                    throw new Error('不是有效的销售凭证');
                }
            }
            let refundDetailList = await this.getRefundDetail(salesVoucher.number, false, ticketNos);
            let refundTicketNos = [];
            salesVoucher.receivable = 0;
            salesVoucher.paid = 0;
            salesVoucher.change = 0;
            refundDetailList.forEach((o) => {
                refundTicketNos = _.concat(refundTicketNos, o.ticketNos);
                salesVoucher.receivable += o.amount;
            });
            salesVoucher.paid = salesVoucher.receivable;
            if (!refundTicketNos || !refundTicketNos.length) {
                throw new Error('没有可退的门票');
            }
            await this.saveRefundTicketData(salesVoucher, refundDetailList);
            return refundTicketNos;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async saveRefundTicketData(voucher, refundDetailList, forcedRefundId) {
        try {
            if (await this._checkRefundDetail(voucher, refundDetailList)) {
                let refundVoucher = await this.voucherService.getVoucherWithId(refundDetailList[0].voucherId);
                refundVoucher.type = VoucherEntity_1.VoucherType.退货;
                refundVoucher.id = null;
                refundVoucher.createdAt = null;
                refundVoucher.updatedAt = null;
                refundVoucher.receivable = -voucher.receivable;
                refundVoucher.paid = -voucher.paid;
                refundVoucher.change = voucher.change > 0 ? -voucher.change : 0;
                if (forcedRefundId) {
                    refundVoucher.forcedRefundId = forcedRefundId;
                }
                if (voucher.areaId) {
                    refundVoucher.areaId = voucher.areaId;
                }
                if (voucher.salesWinId) {
                    refundVoucher.salesWinId = voucher.salesWinId;
                }
                if (voucher.maker) {
                    refundVoucher.handler = refundVoucher.auditor = refundVoucher.maker = voucher.maker;
                }
                if (voucher.settlementId) {
                    refundVoucher.settlementId = voucher.settlementId;
                }
                if (voucher.settlementCardId) {
                    refundVoucher.settlementCardId = voucher.settlementCardId;
                }
                refundVoucher = await this.voucherService.addVoucher(refundVoucher);
                await this._addRefundDetail(refundVoucher, refundDetailList);
                await this._addSoldTicket(refundDetailList);
                await this.soldRefundVoucherRepository.insertRefundVoucher({
                    soldVoucherId: refundDetailList[0].voucherId,
                    refundVoucherId: refundVoucher.id
                });
            }
            return true;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async _checkRefundDetail(voucher, refundDetailList) {
        if (Number(voucher.receivable).toFixed(2) !== Number(voucher.paid - voucher.change).toFixed(2)) {
            throw new Error('实退金额异常');
        }
        let amount = 0;
        for (let refundDetail of refundDetailList) {
            amount += refundDetail.amount;
        }
        if (Number(amount).toFixed(2) !== Number(voucher.receivable).toFixed(2)) {
            throw new Error('明细金额异常');
        }
        return true;
    }
    async _addRefundDetail(voucher, refundDetailList) {
        try {
            let _voucherDetailList = [];
            let seqNo = 1;
            for (let refundDetail of refundDetailList) {
                let _voucherDetail = await this.voucherDetailService.getVoucherDetailWithId(refundDetail.id);
                _voucherDetail.voucherId = voucher.id;
                _voucherDetail.seqNo = seqNo;
                _voucherDetail.quantity = -refundDetail.quantity;
                _voucherDetail.amount = -refundDetail.amount;
                _voucherDetail.id = null;
                _voucherDetail.createdAt = null;
                _voucherDetail.updatedAt = null;
                _voucherDetail = await this.voucherDetailRepository.insertVoucherDetail(_voucherDetail);
                let voucherDetailTicket = {
                    voucherDetailId: _voucherDetail.id,
                    startDate: refundDetail.startDate.toString(),
                    endDate: refundDetail.endDate.toString(),
                    startId: refundDetail.startId.toString(),
                    endId: refundDetail.endId.toString(),
                    startSerial: refundDetail.startSerial,
                    endSerial: refundDetail.endSerial,
                    ticketNumber: -refundDetail.quantity,
                    nominalFee: 0,
                    deposit: 0,
                    handCharge: 0
                };
                voucherDetailTicket = await this.voucherDetailTicketRepository.insertVoucherDetailTicket(voucherDetailTicket);
                const voucherProductSplitList = await this.voucherProductSplitRepository.findByVoucherDetailId(refundDetail.id);
                let _voucherProductSplitList = [];
                for (let voucherProductSplit of voucherProductSplitList) {
                    voucherProductSplit.voucherDetailId = _voucherDetail.id;
                    voucherProductSplit.quantity = -refundDetail.quantity;
                    voucherProductSplit.amount = -(refundDetail.quantity * voucherProductSplit.price);
                    voucherProductSplit.id = null;
                    voucherProductSplit.createdAt = null;
                    voucherProductSplit.updatedAt = null;
                    _voucherProductSplitList.push(voucherProductSplit);
                }
                _voucherProductSplitList = await this.voucherProductSplitRepository.insertVoucherProductSplitList(_voucherProductSplitList);
                _voucherDetailList.push(_voucherDetail);
                refundDetail.id = _voucherDetail.id;
                refundDetail.voucherDetailTicketId = voucherDetailTicket.id;
                seqNo++;
            }
            return refundDetailList;
        }
        catch (error) {
            log_1.logger.error('保存退票凭证明细异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async _addSoldTicket(refundDetailList) {
        try {
            let soldTicketList = [];
            for (let refundDetail of refundDetailList) {
                for (let ticketNo of refundDetail.ticketNos) {
                    let soldTicket = {
                        voucherDetailTicketId: refundDetail.voucherDetailTicketId,
                        businessTicketId: refundDetail.businessTicketId,
                        crowdKindId: refundDetail.crowdKindId,
                        priceId: refundDetail.priceId,
                        price: refundDetail.price,
                        ticketNo: ticketNo,
                        remainAmount: 0,
                        discountAmount: 0,
                        usedAmount: 0,
                        remainTimes: 0,
                        usedTimes: 0,
                        discountTimes: 0,
                        refundAmount: 0,
                        forceRefundAmount: 0,
                        reservedAmount: 0,
                        deposit: 0,
                        handCharge: 0,
                        isRefundBalance: 1,
                        startTime: refundDetail.startDate.toString(),
                        endTime: refundDetail.endDate.toString(),
                        weekLimit: '1111111',
                        dayLimit: '',
                        isOnLine: refundDetail.businessTicket.salesScheme.isOnLine,
                        state: 1
                    };
                    soldTicketList.push(soldTicket);
                }
            }
            soldTicketList = await this.soldTicketRepository.insertSoldTicketList(soldTicketList);
            return soldTicketList;
        }
        catch (error) {
            log_1.logger.error('保存退票售出门票异常');
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", VoucherDetailRepository_1.VoucherDetailRepository)
], RefundTicketService.prototype, "voucherDetailRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", VoucherDetailTicketRepository_1.VoucherDetailTicketRepository)
], RefundTicketService.prototype, "voucherDetailTicketRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", VoucherProductSplitRepository_1.VoucherProductSplitRepository)
], RefundTicketService.prototype, "voucherProductSplitRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", SoldTicketRepository_1.SoldTicketRepository)
], RefundTicketService.prototype, "soldTicketRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", SoldRefundVoucherRepository_1.SoldRefundVoucherRepository)
], RefundTicketService.prototype, "soldRefundVoucherRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", ForcedRefundRightRepository_1.ForcedRefundRightRepository)
], RefundTicketService.prototype, "forcedRefundRightRepository", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", VoucherService_1.VoucherService)
], RefundTicketService.prototype, "voucherService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", VoucherDetailService_1.VoucherDetailService)
], RefundTicketService.prototype, "voucherDetailService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", SoldTicketService_1.SoldTicketService)
], RefundTicketService.prototype, "soldTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", BusinessTicketService_1.BusinessTicketService)
], RefundTicketService.prototype, "businessTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", CheckTicketLogService_1.CheckTicketLogService)
], RefundTicketService.prototype, "checkTicketLogService", void 0);
exports.RefundTicketService = RefundTicketService;
