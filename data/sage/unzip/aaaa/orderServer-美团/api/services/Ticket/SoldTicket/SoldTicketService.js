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
const VoucherEntity_1 = require("../../../entities/Voucher/VoucherEntity");
const SoldTicketRepository_1 = require("../../../repositories/SoldTicket/SoldTicketRepository");
const SoldTicketDetailRepository_1 = require("../../../repositories/SoldTicket/SoldTicketDetailRepository");
const SoldTicketFingerprintRepository_1 = require("../../../repositories/SoldTicket/SoldTicketFingerprintRepository");
const SoldTicketFaceFeatureRepository_1 = require("../../../repositories/SoldTicket/SoldTicketFaceFeatureRepository");
const SoldVenueTicketRepository_1 = require("../../../repositories/SoldTicket/SoldVenueTicketRepository");
const PrintTicketSeqNoRepository_1 = require("../../../repositories/Ticket/PrintTicketSeqNoRepository");
const _ = require("lodash");
const moment = require("moment");
const qrcode = require("../../../utils/QRCode");
class SoldTicketService {
    constructor() {
    }
    async getSoldTicketWithNumber(number) {
        try {
            return await this.soldTicketRepository.findByNumber(number);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getSoldTicketWithVoucherDetailTicketId(voucherDetailTicketId) {
        try {
            return await this.soldTicketRepository.findByVoucherDetailTicketId(voucherDetailTicketId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async saveSalesSoldTicket(voucher, voucherDetailList) {
        try {
            let soldTicketList = [];
            if (voucher.type === VoucherEntity_1.VoucherType.出售 || voucher.type === VoucherEntity_1.VoucherType.补票) {
                let printTicketList = [];
                let _soldTicketList = [];
                let printTicket;
                let soldTicket;
                for (let voucherDetail of voucherDetailList) {
                    if (voucherDetail.businessTicket.ticket.sellWay === 2) {
                        continue;
                    }
                    _soldTicketList = [];
                    soldTicket = {
                        voucherDetailTicketId: voucherDetail.voucherDetailTicketId,
                        businessTicketId: voucherDetail.businessTicket.id,
                        crowdKindId: voucherDetail.crowdKindId,
                        priceId: voucherDetail.priceId,
                        price: voucherDetail.price,
                        ticketNo: '',
                        remainAmount: voucherDetail.amount - voucherDetail.businessTicket.deposit,
                        discountAmount: 0,
                        usedAmount: 0,
                        remainTimes: voucherDetail.quantity,
                        usedTimes: 0,
                        discountTimes: 0,
                        refundAmount: voucherDetail.businessTicket.refundAmount,
                        forceRefundAmount: voucherDetail.businessTicket.forceRefundAmount,
                        reservedAmount: voucherDetail.businessTicket.reservedMoney,
                        deposit: voucherDetail.businessTicket.deposit,
                        handCharge: voucherDetail.businessTicket.handCharge,
                        isRefundBalance: voucherDetail.businessTicket.isRefundBalance ? 0 : 1,
                        startTime: voucherDetail.businessTicket.startDate.toString(),
                        endTime: voucherDetail.businessTicket.endDate.toString(),
                        weekLimit: '1111111',
                        dayLimit: '',
                        isOnLine: voucherDetail.businessTicket.salesScheme.isOnLine,
                        state: 0
                    };
                    if (voucherDetail.businessTicket.personPreTicket === 1) {
                        soldTicket.ticketNo = voucherDetail.startSerial;
                        if (voucherDetail.icCardList && voucherDetail.icCardList.length) {
                            soldTicket.uniqueId = voucherDetail.icCardList[0].idCard;
                        }
                        if (voucherDetail.idCardList && voucherDetail.idCardList.length) {
                            soldTicket.idCard = voucherDetail.idCardList[0].idCard;
                        }
                        if (voucherDetail.businessTicket.ticket.sellWay === 1) {
                            let oldSoldTicket = await this.soldTicketRepository.findByTicketNo(soldTicket.ticketNo);
                            if (oldSoldTicket) {
                                throw new Error('门票' + soldTicket.ticketNo + '已存在');
                            }
                            printTicket = _.find(printTicketList, {
                                salesWinId: voucher.salesWinId,
                                productId: voucherDetail.productId
                            });
                            if (printTicket) {
                                printTicket.seqNo = Number(printTicket.seqNo) + 1;
                                if (voucherDetail.endId > printTicket.endId) {
                                    printTicket.endId = voucherDetail.endId;
                                }
                            }
                            else {
                                printTicketList.push({
                                    salesWinId: voucher.salesWinId,
                                    productId: voucherDetail.productId,
                                    endId: voucherDetail.endId,
                                    seqNo: 1
                                });
                            }
                        }
                        soldTicket.qrcodePath = await qrcode.generateQRCode(soldTicket.ticketNo);
                        _soldTicketList.push(soldTicket);
                    }
                    else {
                        for (let i = 0; i < voucherDetail.quantity; i++) {
                            let _soldTicket = _.cloneDeep(soldTicket);
                            _soldTicket.remainTimes = 1;
                            _soldTicket.remainAmount = soldTicket.price;
                            _soldTicket.ticketNo = voucherDetail.startId <= 0
                                ? '*'
                                : voucherDetail.serialPrefix + _.padStart((voucherDetail.startId + i).toString(), voucherDetail.serialNoLength, '0');
                            if (voucherDetail.icCardList && voucherDetail.icCardList.length > i) {
                                _soldTicket.uniqueId = voucherDetail.icCardList[i].idCard;
                            }
                            if (voucherDetail.idCardList && voucherDetail.idCardList.length > i) {
                                _soldTicket.idCard = voucherDetail.idCardList[i].idCard;
                            }
                            if (voucherDetail.businessTicket.ticket.sellWay === 1) {
                                let oldSoldTicket = await this.soldTicketRepository.findByTicketNo(_soldTicket.ticketNo);
                                if (oldSoldTicket) {
                                    throw new Error('门票' + _soldTicket.ticketNo + '已存在');
                                }
                                printTicket = _.find(printTicketList, {
                                    salesWinId: voucher.salesWinId,
                                    productId: voucherDetail.productId
                                });
                                if (printTicket) {
                                    printTicket.seqNo = Number(printTicket.seqNo) + 1;
                                    if (voucherDetail.endId > printTicket.endId) {
                                        printTicket.endId = voucherDetail.endId;
                                    }
                                }
                                else {
                                    printTicketList.push({
                                        salesWinId: voucher.salesWinId,
                                        productId: voucherDetail.productId,
                                        endId: voucherDetail.endId,
                                        seqNo: 1
                                    });
                                }
                            }
                            _soldTicket.qrcodePath = await qrcode.generateQRCode(_soldTicket.ticketNo);
                            _soldTicketList.push(_soldTicket);
                        }
                    }
                    _soldTicketList = await this.soldTicketRepository.insertSoldTicketList(_soldTicketList);
                    await this.saveSoldTicketDetail(voucherDetail, _soldTicketList);
                    await this.saveSoldVenueTicket(voucherDetail, _soldTicketList);
                    await this.saveSoldTicketFingerprint(voucherDetail, _soldTicketList);
                    await this.saveSoldTicketFaceFeature(voucherDetail, _soldTicketList);
                    _soldTicketList.forEach((o) => {
                        soldTicketList.push(o);
                    });
                }
                if (printTicketList && printTicketList.length > 0) {
                    for (let printTicket of printTicketList) {
                        await this.printTicketSeqNoRepository.updateSeqNo(printTicket.productId, printTicket.salesWinId, printTicket.seqNo, printTicket.endId);
                    }
                }
            }
            return soldTicketList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async saveSoldTicketDetail(voucherDetail, soldTicketList) {
        try {
            let soldTicketDetailList = [];
            let soldTicketDetail;
            if (voucherDetail.businessTicket.accessTicketSetList) {
                for (let soldTicket of soldTicketList) {
                    for (let accessTicketSet of voucherDetail.businessTicket.accessTicketSetList) {
                        let remainTimes = 0;
                        let remainAmount = 0;
                        if (voucherDetail.businessTicket.personPreTicket === 1) {
                            if (voucherDetail.businessTicket.consumeType === 0) {
                                remainTimes = voucherDetail.quantity * accessTicketSet.totalTimes;
                            }
                            if (voucherDetail.businessTicket.consumeType === 1) {
                                remainAmount = voucherDetail.amount;
                            }
                        }
                        else {
                            if (voucherDetail.businessTicket.consumeType === 0) {
                                remainTimes = accessTicketSet.totalTimes;
                            }
                            if (voucherDetail.businessTicket.consumeType === 1) {
                                remainAmount = voucherDetail.price;
                            }
                        }
                        soldTicketDetail = {
                            soldTicketId: soldTicket.id,
                            accessSiteId: accessTicketSet.accessSiteId,
                            consumeType: voucherDetail.businessTicket.consumeType,
                            singleTimes: accessTicketSet.singleTimes,
                            remainTimes: remainTimes,
                            usedTimes: 0,
                            singleAmount: accessTicketSet.singleAmount,
                            remainAmount: remainAmount,
                            usedAmount: 0,
                            lastCheckTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                            lastCheckDir: 0
                        };
                        soldTicketDetailList.push(soldTicketDetail);
                    }
                }
                soldTicketDetailList = await this.soldTicketDetailRepository.insertSoldTicketDetailList(soldTicketDetailList);
            }
            return soldTicketDetailList;
        }
        catch (error) {
            log_1.logger.error('保存售出门票明细异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async saveSoldVenueTicket(voucherDetail, soldTicketList) {
        try {
            let soldVenueTicketList = [];
            let soldVenueTicket;
            if (voucherDetail.venueSession) {
                for (let soldTicket of soldTicketList) {
                    soldVenueTicket = {
                        soldTicketId: soldTicket.id,
                        venueSessionId: voucherDetail.venueSession.id,
                        sessionDate: moment(voucherDetail.venueSession.startDate).format('YYYY-MM-DD') + ' ' + voucherDetail.venueSession.startTime
                    };
                    soldVenueTicketList.push(soldVenueTicket);
                }
                soldVenueTicketList = await this.soldVenueTicketRepository.insertSoldVenueTicketList(soldVenueTicketList);
            }
            return soldVenueTicketList;
        }
        catch (error) {
            log_1.logger.error('保存售出门票场次异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async saveSoldTicketFingerprint(voucherDetail, soldTicketList) {
        try {
            let soldTicketFingerprintList = [];
            let soldTicketFingerprint;
            if (voucherDetail.fingerList && voucherDetail.fingerList.length) {
                for (let i = 0; i < soldTicketList.length; i++) {
                    let finger = voucherDetail.fingerList[i];
                    if (finger) {
                        soldTicketFingerprint = {
                            soldTicketId: soldTicketList[i].id,
                            fingersId: i + 1,
                            features: finger.fingerFeature
                        };
                        soldTicketFingerprintList.push(soldTicketFingerprint);
                    }
                }
                soldTicketFingerprintList = await this.soldTicketFingerprintRepository.insertSoldTicketFingerprintList(soldTicketFingerprintList);
            }
            return soldTicketFingerprintList;
        }
        catch (error) {
            log_1.logger.error('保存售出门票指纹异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async saveSoldTicketFaceFeature(voucherDetail, soldTicketList) {
        try {
            let soldTicketFaceFeatureList = [];
            let soldTicketFaceFeature;
            if (voucherDetail.faceList && voucherDetail.faceList.length) {
                for (let i = 0; i < soldTicketList.length; i++) {
                    let face = voucherDetail.faceList[i];
                    if (face) {
                        soldTicketFaceFeature = {
                            soldTicketId: soldTicketList[i].id,
                            faceImage: face.faceImage
                        };
                        soldTicketFaceFeatureList.push(soldTicketFaceFeature);
                    }
                }
                soldTicketFaceFeatureList = await this.soldTicketFaceFeatureRepository.insertSoldTicketFaceFeatureList(soldTicketFaceFeatureList);
            }
            return soldTicketFaceFeatureList;
        }
        catch (error) {
            log_1.logger.error('保存售出门票人脸异常');
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SoldTicketRepository_1.SoldTicketRepository)
], SoldTicketService.prototype, "soldTicketRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SoldTicketDetailRepository_1.SoldTicketDetailRepository)
], SoldTicketService.prototype, "soldTicketDetailRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SoldTicketFingerprintRepository_1.SoldTicketFingerprintRepository)
], SoldTicketService.prototype, "soldTicketFingerprintRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SoldTicketFaceFeatureRepository_1.SoldTicketFaceFeatureRepository)
], SoldTicketService.prototype, "soldTicketFaceFeatureRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SoldVenueTicketRepository_1.SoldVenueTicketRepository)
], SoldTicketService.prototype, "soldVenueTicketRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", PrintTicketSeqNoRepository_1.PrintTicketSeqNoRepository)
], SoldTicketService.prototype, "printTicketSeqNoRepository", void 0);
exports.SoldTicketService = SoldTicketService;
