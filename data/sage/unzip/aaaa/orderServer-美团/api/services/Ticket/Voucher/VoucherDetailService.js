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
const log_1 = require("../../../../middleware/log");
const repositories_1 = require("../../../repositories");
const service_1 = require("../../../../lib/service");
const VoucherDetailRepository_1 = require("../../../repositories/Voucher/VoucherDetailRepository");
const VoucherDetailTicketRepository_1 = require("../../../repositories/Voucher/VoucherDetailTicketRepository");
const VoucherDetailPersonRepository_1 = require("../../../repositories/Voucher/VoucherDetailPersonRepository");
const VoucherProductSplitRepository_1 = require("../../../repositories/Voucher/VoucherProductSplitRepository");
const VoucherVenueDetailRepository_1 = require("../../../repositories/Voucher/VoucherVenueDetailRepository");
const BusinessTicketService_1 = require("../BusinessTicket/BusinessTicketService");
const VenueTicketService_1 = require("../Venue/VenueTicketService");
const _ = require("lodash");
const moment = require("moment");
class VoucherDetailService {
    constructor() {
    }
    async getVoucherDetailWithId(voucherDetailId) {
        try {
            return await this.voucherDetailRepository.findById(voucherDetailId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getVoucherDetailWithVoucher(voucherId) {
        try {
            return await this.voucherDetailRepository.findByVoucher(voucherId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getVoucherDetailTicketWithId(voucherDetailTicketId) {
        try {
            return await this.voucherDetailTicketRepository.findById(voucherDetailTicketId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getVoucherDetailTicketWithVoucherDetailId(voucherDetailId) {
        try {
            return await this.voucherDetailTicketRepository.findByVoucherDetailId(voucherDetailId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getVoucherDetailPersonWithNumber(number) {
        try {
            return await this.voucherDetailPersonRepository.findByNumber(number);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async convertVoucherDetailEntity(voucherDetail, voucher) {
        try {
            let businessTicket = await this.businessTicketService.getBusinessTicketWithBusinessPriceId(voucherDetail.businessPriceId);
            let voucherDetailTicket = await this.getVoucherDetailTicketWithVoucherDetailId(voucherDetail.id);
            let serialPrefix = businessTicket.ticket.product.numberRule.rulesPrefix + businessTicket.ticket.product.code;
            if (businessTicket.ticket.sellWay === 1) {
                serialPrefix += _.padStart(voucher.salesWinId.toString(), 3, '0');
            }
            let serialNoLength = businessTicket.ticket.product.numberRule.serialNoLen;
            const voucherDetailEntity = {
                id: voucherDetail.id,
                voucherId: voucher.id,
                productId: voucherDetail.productId,
                crowdKindId: voucherDetail.crowdKindId,
                priceId: voucherDetail.priceId,
                discountSchemeId: voucherDetail.discountSchemeId,
                discount: voucherDetail.discount,
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
                productName: businessTicket.ticket.product.name,
                crowdKindName: businessTicket.crowdKind.name,
                priceName: businessTicket.price.name,
                serialPrefix: serialPrefix,
                serialNoLength: serialNoLength
            };
            let voucherDetailPersonList = await this.voucherDetailPersonRepository.findByVoucherDetail(voucherDetailEntity.id);
            if (voucherDetailPersonList && voucherDetailPersonList.length) {
                voucherDetailEntity.idCardList = [];
                voucherDetailEntity.icCardList = [];
                for (let voucherDetailPerson of voucherDetailPersonList) {
                    if (voucherDetailPerson.idCard) {
                        voucherDetailEntity.idCardList.push(voucherDetailPerson);
                    }
                    else if (voucherDetailPerson.uniqueId) {
                        voucherDetailEntity.icCardList.push(voucherDetailPerson);
                    }
                }
            }
            return voucherDetailEntity;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async addVoucherDetail(voucher, voucherDetailList) {
        try {
            let _voucherDetailList = [];
            for (let voucherDetail of voucherDetailList) {
                if (!voucherDetail.businessTicket) {
                    voucherDetail.businessTicket = await this.businessTicketService.getBusinessTicket(voucherDetail.businessTicketId);
                }
                let _voucherDetail = {
                    voucherId: voucher.id,
                    productId: voucherDetail.businessTicket.ticket.product.id,
                    seqNo: voucherDetail.seqNo,
                    salesSchemeId: voucherDetail.businessTicket.salesSchemeId,
                    crowdKindId: voucherDetail.crowdKindId,
                    businessPriceId: voucherDetail.businessPriceId,
                    priceId: voucherDetail.priceId,
                    discountSchemeId: voucherDetail.discountSchemeId,
                    discount: voucherDetail.discount,
                    quantity: voucherDetail.quantity,
                    price: voucherDetail.price,
                    amount: voucherDetail.amount
                };
                _voucherDetailList.push(_voucherDetail);
            }
            _voucherDetailList = await this.voucherDetailRepository.insertVoucherDetailList(_voucherDetailList);
            for (let voucherDetail of voucherDetailList) {
                let _voucherDetail = _.find(_voucherDetailList, { seqNo: voucherDetail.seqNo });
                if (_voucherDetail) {
                    voucherDetail.id = _voucherDetail.id;
                }
                else {
                    throw new Error('保存凭证明细异常：未找到对应序号的凭证明细数据');
                }
            }
            await this.addVoucherDetailTicket(voucherDetailList);
            await this.addVoucherDetailPerson(voucherDetailList);
            await this.addVoucherVenueDetail(voucherDetailList);
            await this.addVoucherProductSplit(voucher, voucherDetailList);
            return voucherDetailList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async addVoucherDetailTicket(voucherDetailList) {
        try {
            let voucherDetailTicketList = [];
            for (let voucherDetail of voucherDetailList) {
                let voucherDetailTicket = {
                    voucherDetailId: voucherDetail.id,
                    startDate: voucherDetail.businessTicket.startDate.toString(),
                    endDate: voucherDetail.businessTicket.endDate.toString(),
                    startId: voucherDetail.startId.toString(),
                    endId: voucherDetail.endId.toString(),
                    startSerial: voucherDetail.startSerial,
                    endSerial: voucherDetail.endSerial,
                    ticketNumber: voucherDetail.businessTicket.personPreTicket === 1 ? 1 : voucherDetail.quantity,
                    nominalFee: voucherDetail.businessTicket.ticket.product.nominalFee,
                    deposit: voucherDetail.businessTicket.deposit,
                    handCharge: voucherDetail.businessTicket.handCharge
                };
                voucherDetailTicketList.push(voucherDetailTicket);
            }
            voucherDetailTicketList = await this.voucherDetailTicketRepository.insertVoucherDetailTicketList(voucherDetailTicketList);
            for (let voucherDetail of voucherDetailList) {
                let voucherDetailTicket = _.find(voucherDetailTicketList, { voucherDetailId: voucherDetail.id });
                if (voucherDetailTicket) {
                    voucherDetail.voucherDetailTicketId = voucherDetailTicket.id;
                }
                else {
                    throw new Error('保存凭证明细门票异常：未找到凭证明细对应的凭证明细门票数据');
                }
            }
            return voucherDetailTicketList;
        }
        catch (error) {
            log_1.logger.error('保存凭证明细门票异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addVoucherDetailPerson(voucherDetailList) {
        try {
            let voucherDetailPersonList = [];
            for (let voucherDetail of voucherDetailList) {
                if (voucherDetail.idCardList && voucherDetail.idCardList.length > 0) {
                    if (voucherDetail.businessTicket.personPreTicket === 1) {
                        for (let card of voucherDetail.idCardList) {
                            card.voucherDetailId = voucherDetail.id;
                            card.ticketNo = voucherDetail.startSerial;
                            voucherDetailPersonList.push(card);
                        }
                    }
                    else {
                        for (let i = 0; i < voucherDetail.quantity; i++) {
                            let card = voucherDetail.idCardList[i];
                            if (card) {
                                card.voucherDetailId = voucherDetail.id;
                                card.ticketNo = voucherDetail.startId <= 0 ? '*' : voucherDetail.serialPrefix + _.padStart((voucherDetail.startId + i).toString(), voucherDetail.serialNoLength, '0');
                                voucherDetailPersonList.push(card);
                            }
                        }
                    }
                }
                if (voucherDetail.icCardList && voucherDetail.icCardList.length > 0) {
                    if (voucherDetail.businessTicket.personPreTicket === 1) {
                        for (let card of voucherDetail.icCardList) {
                            card.voucherDetailId = voucherDetail.id;
                            card.uniqueId = card.idCard;
                            card.ticketNo = voucherDetail.startSerial;
                            voucherDetailPersonList.push(card);
                        }
                    }
                    else {
                        for (let i = 0; i < voucherDetail.quantity; i++) {
                            let card = voucherDetail.icCardList[i];
                            if (card) {
                                card.voucherDetailId = voucherDetail.id;
                                card.uniqueId = card.idCard;
                                card.ticketNo = voucherDetail.startId <= 0 ? '*' : voucherDetail.serialPrefix + _.padStart((voucherDetail.startId + i).toString(), voucherDetail.serialNoLength, '0');
                                voucherDetailPersonList.push(card);
                            }
                        }
                    }
                }
            }
            voucherDetailPersonList = await this.voucherDetailPersonRepository.insertVoucherDetailPersonList(voucherDetailPersonList);
            return voucherDetailPersonList;
        }
        catch (error) {
            log_1.logger.error('保存凭证明细个人信息异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addVoucherVenueDetail(voucherDetailList) {
        try {
            let voucherVenueDetailList = [];
            for (let voucherDetail of voucherDetailList) {
                if (voucherDetail.venueSession) {
                    let voucherVenueDetail = {
                        voucherDetailId: voucherDetail.id,
                        venueSessionId: voucherDetail.venueSession.id,
                        sessionDate: moment(voucherDetail.venueSession.startDate).format('YYYY-MM-DD') + ' ' + voucherDetail.venueSession.startTime
                    };
                    voucherVenueDetailList.push(voucherVenueDetail);
                }
            }
            voucherVenueDetailList = await this.voucherVenueDetailRepository.insertVoucherVenueDetailList(voucherVenueDetailList);
            return voucherVenueDetailList;
        }
        catch (error) {
            log_1.logger.error('保存凭证明细场次信息异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addVoucherProductSplit(voucher, voucherDetailList) {
        try {
            let voucherProductSplitList = [];
            for (let voucherDetail of voucherDetailList) {
                if (voucherDetail.businessTicket.ticket.product.subProductList &&
                    voucherDetail.businessTicket.ticket.product.subProductList.length > 0) {
                    for (let subProduct of voucherDetail.businessTicket.ticket.product.subProductList) {
                        if (voucherDetail.subProductIds && voucherDetail.subProductIds.length > 0) {
                            if (_.includes(voucherDetail.subProductIds, subProduct.id)) {
                                let voucherProductSplit = {
                                    voucherDetailId: voucherDetail.id,
                                    businessId: voucher.businessId,
                                    productId: subProduct.id,
                                    quantity: subProduct.composeNum * voucherDetail.quantity,
                                    price: subProduct.actualAmount,
                                    amount: subProduct.composeNum * voucherDetail.quantity * subProduct.actualAmount
                                };
                                voucherProductSplitList.push(voucherProductSplit);
                            }
                        }
                        else {
                            let voucherProductSplit = {
                                voucherDetailId: voucherDetail.id,
                                businessId: voucher.businessId,
                                productId: subProduct.id,
                                quantity: subProduct.composeNum * voucherDetail.quantity,
                                price: subProduct.actualAmount,
                                amount: subProduct.composeNum * voucherDetail.quantity * subProduct.actualAmount
                            };
                            voucherProductSplitList.push(voucherProductSplit);
                        }
                    }
                }
            }
            voucherProductSplitList = await this.voucherProductSplitRepository.insertVoucherProductSplitList(voucherProductSplitList);
            return voucherProductSplitList;
        }
        catch (error) {
            log_1.logger.error('保存凭证明细子产品异常');
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", BusinessTicketService_1.BusinessTicketService)
], VoucherDetailService.prototype, "businessTicketService", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VoucherDetailRepository_1.VoucherDetailRepository)
], VoucherDetailService.prototype, "voucherDetailRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VoucherDetailTicketRepository_1.VoucherDetailTicketRepository)
], VoucherDetailService.prototype, "voucherDetailTicketRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VoucherDetailPersonRepository_1.VoucherDetailPersonRepository)
], VoucherDetailService.prototype, "voucherDetailPersonRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VoucherProductSplitRepository_1.VoucherProductSplitRepository)
], VoucherDetailService.prototype, "voucherProductSplitRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VoucherVenueDetailRepository_1.VoucherVenueDetailRepository)
], VoucherDetailService.prototype, "voucherVenueDetailRepository", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", VenueTicketService_1.VenueTicketService)
], VoucherDetailService.prototype, "venueTicketService", void 0);
exports.VoucherDetailService = VoucherDetailService;
