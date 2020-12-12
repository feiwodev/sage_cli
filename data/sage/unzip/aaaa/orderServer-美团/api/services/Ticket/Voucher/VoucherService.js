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
const AreaRepository_1 = require("../../../repositories/SalesWin/AreaRepository");
const SalesSiteRepository_1 = require("../../../repositories/SalesWin/SalesSiteRepository");
const SalesWinRepository_1 = require("../../../repositories/SalesWin/SalesWinRepository");
const BusinessRepository_1 = require("../../../repositories/BusinessTicket/BusinessRepository");
const TouristsAddressRepository_1 = require("../../../repositories/Customer/TouristsAddressRepository");
const CustomerRepository_1 = require("../../../repositories/Customer/CustomerRepository");
const ManagerRepository_1 = require("../../../repositories/Customer/ManagerRepository");
const GuideRepository_1 = require("../../../repositories/Customer/GuideRepository");
const UserRepository_1 = require("../../../repositories/User/UserRepository");
const SettlementRepository_1 = require("../../../repositories/BusinessTicket/SettlementRepository");
const VoucherSeqNoRepository_1 = require("../../../repositories/Voucher/VoucherSeqNoRepository");
const VoucherRepository_1 = require("../../../repositories/Voucher/VoucherRepository");
const VoucherDetailService_1 = require("./VoucherDetailService");
const SoldTicketService_1 = require("../SoldTicket/SoldTicketService");
const CheckTicketLogService_1 = require("../../Access/CheckTicketLogService");
const _ = require("lodash");
const moment = require("moment");
class VoucherService {
    constructor() {
    }
    async getVoucherLogs(voucherType, userId, keyword, startDate, endDate, offset, limit) {
        try {
            let voucherList = [];
            if (keyword && keyword.trim()) {
                let voucher = await this.getVoucherWithTypeOfNumber(voucherType, keyword.trim());
                if (voucher) {
                    voucherList.push(await this.convertVoucherEntity(voucher));
                }
                else {
                    const soldTicketList = await this.soldTicketService.getSoldTicketWithNumber(keyword);
                    for (let soldTicket of soldTicketList) {
                        const voucherDetailTicket = await this.voucherDetailService.getVoucherDetailTicketWithId(soldTicket.voucherDetailTicketId);
                        if (voucherDetailTicket) {
                            const voucherDetail = await this.voucherDetailService.getVoucherDetailWithId(voucherDetailTicket.voucherDetailId);
                            voucher = await this.getVoucherWithId(voucherDetail.voucherId);
                            if (voucher.type === voucherType) {
                                voucherList.push(await this.convertVoucherEntity(voucher));
                                break;
                            }
                        }
                    }
                    if (!voucherList.length) {
                        const checkTicketLog = await this.checkTicketLogService.getCheckTicketLogWithNumber(keyword);
                        if (checkTicketLog) {
                            const voucherDetailTicket = await this.voucherDetailService.getVoucherDetailTicketWithId(checkTicketLog.voucherDetailTicketId);
                            if (voucherDetailTicket) {
                                const voucherDetail = await this.voucherDetailService.getVoucherDetailWithId(voucherDetailTicket.voucherDetailId);
                                voucher = await this.getVoucherWithId(voucherDetail.voucherId);
                                voucherList.push(await this.convertVoucherEntity(voucher));
                            }
                        }
                    }
                }
            }
            else {
                const _voucherList = await this.getVoucherWithTypeOfUser(voucherType, userId, startDate, endDate, offset, limit);
                for (const voucher of _voucherList) {
                    voucherList.push(await this.convertVoucherEntity(voucher));
                }
            }
            if (voucherList && voucherList.length) {
                for (const voucher of voucherList) {
                    const voucherDetailEntityList = [];
                    const _voucherDetailList = await this.voucherDetailService.getVoucherDetailWithVoucher(voucher.id);
                    let total = 0;
                    for (const voucherDetail of _voucherDetailList) {
                        const voucherDetailEntity = await this.voucherDetailService.convertVoucherDetailEntity(voucherDetail, voucher);
                        voucherDetailEntityList.push(voucherDetailEntity);
                        total += voucherDetailEntity.quantity;
                    }
                    voucher.voucherDetailList = voucherDetailEntityList;
                    voucher.total = total;
                }
            }
            return voucherList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async convertVoucherEntity(voucher) {
        try {
            const voucherEntity = voucher;
            if (voucherEntity.maker) {
                const user = await this.userRepository.findById(voucherEntity.maker);
                voucherEntity.makerName = user ? user.name : '';
            }
            if (voucherEntity.areaId) {
                const area = await this.areaRepository.findById(voucherEntity.areaId);
                voucherEntity.areaName = area ? area.name : '';
            }
            if (voucherEntity.salesWinId) {
                const salesWin = await this.salesWinRepository.findById(voucherEntity.salesWinId);
                voucherEntity.salesWinName = salesWin ? salesWin.name : '';
                if (salesWin) {
                    const salesSite = await this.salesSiteRepository.findById(salesWin.salesSiteId);
                    voucherEntity.salesSiteName = salesSite ? salesSite.name : '';
                }
            }
            if (voucherEntity.businessId) {
                const business = await this.businessRepository.findById(voucherEntity.businessId);
                voucherEntity.businessName = business ? business.name : '';
            }
            if (voucherEntity.touristsAddressId) {
                const touristsAddress = await this.touristsAddressRepository.findById(voucherEntity.touristsAddressId);
                voucherEntity.touristsAddressName = touristsAddress ? touristsAddress.name : '';
            }
            if (voucherEntity.customerId) {
                const customer = await this.customerRepository.findById(voucherEntity.customerId);
                voucherEntity.customerName = customer ? customer.name : '';
            }
            if (voucherEntity.managerId) {
                const manager = await this.managerRepository.findById(voucherEntity.managerId);
                voucherEntity.managerName = manager ? manager.name : '';
            }
            if (voucherEntity.guideId) {
                const guide = await this.guideRepository.findById(voucherEntity.guideId);
                voucherEntity.guideName = guide ? guide.name : '';
            }
            if (voucherEntity.settlementId) {
                const settlement = await this.settlementRepository.findById(voucherEntity.settlementId);
                voucherEntity.settlementName = settlement ? settlement.name : '';
            }
            return voucherEntity;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getVoucherWithId(id) {
        try {
            return await this.voucherRepository.findById(id);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getVoucherWithNumber(number) {
        try {
            return await this.voucherRepository.findByNumber(number);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getVoucherWithTypeOfNumber(type, number) {
        try {
            return await this.voucherRepository.findByTypeAndNumber(type, number);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getVoucherWithTypeOfUser(type, userId, startDate, endDate, offset, limit) {
        try {
            return await this.voucherRepository.findByTypeOrUser(type, userId, startDate, endDate, offset, limit);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getRefundVoucherWithId(soldVoucherId) {
        try {
            return await this.voucherRepository.findRefundById(soldVoucherId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async generateSerialNumber(type, salesWinId, userId) {
        try {
            const seqNo = await this.voucherSeqNoRepository.findSeqNo(type, salesWinId, userId);
            let serialNumber = '';
            let serialPrefix = _.padStart(type.toString(), 2, '0') +
                moment().format('YYMMDD') +
                _.padStart(salesWinId.toString(), 3, '0') +
                _.padStart(userId.toString(), 3, '0');
            serialNumber = serialPrefix + _.padStart(seqNo.toString(), 6, '0');
            return serialNumber;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async addVoucher(voucher) {
        try {
            voucher.number = await this.generateSerialNumber(voucher.type, voucher.salesWinId, voucher.maker);
            let result = await this.voucherRepository.insertVoucher(voucher);
            await this.voucherSeqNoRepository.updateSeqNo(voucher.type, voucher.salesWinId, voucher.maker);
            return result;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VoucherSeqNoRepository_1.VoucherSeqNoRepository)
], VoucherService.prototype, "voucherSeqNoRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VoucherRepository_1.VoucherRepository)
], VoucherService.prototype, "voucherRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", AreaRepository_1.AreaRepository)
], VoucherService.prototype, "areaRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SalesSiteRepository_1.SalesSiteRepository)
], VoucherService.prototype, "salesSiteRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SalesWinRepository_1.SalesWinRepository)
], VoucherService.prototype, "salesWinRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", BusinessRepository_1.BusinessRepository)
], VoucherService.prototype, "businessRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", TouristsAddressRepository_1.TouristsAddressRepository)
], VoucherService.prototype, "touristsAddressRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", CustomerRepository_1.CustomerRepository)
], VoucherService.prototype, "customerRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", ManagerRepository_1.ManagerRepository)
], VoucherService.prototype, "managerRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", GuideRepository_1.GuideRepository)
], VoucherService.prototype, "guideRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", UserRepository_1.UserRepository)
], VoucherService.prototype, "userRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SettlementRepository_1.SettlementRepository)
], VoucherService.prototype, "settlementRepository", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", VoucherDetailService_1.VoucherDetailService)
], VoucherService.prototype, "voucherDetailService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", SoldTicketService_1.SoldTicketService)
], VoucherService.prototype, "soldTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", CheckTicketLogService_1.CheckTicketLogService)
], VoucherService.prototype, "checkTicketLogService", void 0);
exports.VoucherService = VoucherService;
