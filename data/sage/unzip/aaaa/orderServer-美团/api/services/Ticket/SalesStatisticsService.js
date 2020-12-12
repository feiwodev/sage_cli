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
const Repository_1 = require("../../repositories/utils/Repository");
const CrowdKindDaySumRepository_1 = require("../../repositories/SalesStatistics/CrowdKindDaySumRepository");
const CustomerDaySumRepository_1 = require("../../repositories/SalesStatistics/CustomerDaySumRepository");
const TouristsAddressDaySumRepository_1 = require("../../repositories/SalesStatistics/TouristsAddressDaySumRepository");
const SalesDaySumRepository_1 = require("../../repositories/SalesStatistics/SalesDaySumRepository");
class SalesStatisticsService {
    constructor() {
    }
    async addCrowdKindDaySum(crowdKindId, quantity, amount, createdAt) {
        try {
            let sumData = await this.crowdKindDaySumRepository.findByDay(crowdKindId, createdAt);
            if (sumData) {
                await this.crowdKindDaySumRepository.updateDaySum(crowdKindId, (sumData.quantity + quantity), (sumData.amount + amount), createdAt);
            }
            else {
                await this.crowdKindDaySumRepository.createDaySum(crowdKindId, quantity, amount, createdAt);
            }
        }
        catch (error) {
            log_1.logger.error('添加人群销售统计数据异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addCustomerDaySum(customerId, quantity, amount, createdAt) {
        try {
            let sumData = await this.customerDaySumRepository.findByDay(customerId, createdAt);
            if (sumData) {
                await this.customerDaySumRepository.updateDaySum(customerId, (sumData.quantity + quantity), (sumData.amount + amount), createdAt);
            }
            else {
                await this.customerDaySumRepository.createDaySum(customerId, quantity, amount, createdAt);
            }
        }
        catch (error) {
            log_1.logger.error('添加客户销售统计数据异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addTouristsAddressDaySum(touristsAddressId, quantity, amount, createdAt) {
        try {
            let sumData = await this.touristsAddressDaySumRepository.findByDay(touristsAddressId, createdAt);
            if (sumData) {
                await this.touristsAddressDaySumRepository.updateDaySum(touristsAddressId, (sumData.quantity + quantity), (sumData.amount + amount), createdAt);
            }
            else {
                await this.touristsAddressDaySumRepository.createDaySum(touristsAddressId, quantity, amount, createdAt);
            }
        }
        catch (error) {
            log_1.logger.error('添加客源地销售统计数据异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addSalesDaySum(salesWinId, businessId, productId, quantity, amount, createdAt) {
        try {
            let sumData = await this.salesDaySumRepository.findByHour(salesWinId, businessId, productId, createdAt);
            if (sumData) {
                await this.salesDaySumRepository.updateDayHour(salesWinId, businessId, productId, (sumData.quantity + quantity), (sumData.amount + amount), createdAt);
            }
            else {
                await this.salesDaySumRepository.createDayHour(salesWinId, businessId, productId, quantity, amount, createdAt);
            }
        }
        catch (error) {
            log_1.logger.error('添加门票销售统计数据异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addStatisticsData(voucher, voucherDetailList) {
        try {
            let quantity = 0;
            let amount = 0;
            for (let voucherDetail of voucherDetailList) {
                quantity = Number(quantity) + Number(voucherDetail.quantity);
                amount = Number(amount) + Number(voucherDetail.amount);
                await this.addSalesDaySum(voucher.salesWinId, voucher.businessId, voucherDetail.businessTicket.ticket.product.id, voucherDetail.quantity, voucherDetail.amount, voucher.createdAt);
                if (voucherDetail.businessTicket.crowdKind.id) {
                    await this.addCrowdKindDaySum(voucherDetail.businessTicket.crowdKind.id, voucherDetail.quantity, voucherDetail.amount, voucher.createdAt);
                }
            }
            if (voucher.customerId) {
                await this.addCustomerDaySum(voucher.customerId, quantity, amount, voucher.createdAt);
            }
            if (voucher.touristsAddressId) {
                await this.addTouristsAddressDaySum(voucher.touristsAddressId, quantity, amount, voucher.createdAt);
            }
            return true;
        }
        catch (error) {
            log_1.logger.error('添加销售统计数据异常');
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", CrowdKindDaySumRepository_1.CrowdKindDaySumRepository)
], SalesStatisticsService.prototype, "crowdKindDaySumRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", CustomerDaySumRepository_1.CustomerDaySumRepository)
], SalesStatisticsService.prototype, "customerDaySumRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", TouristsAddressDaySumRepository_1.TouristsAddressDaySumRepository)
], SalesStatisticsService.prototype, "touristsAddressDaySumRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", SalesDaySumRepository_1.SalesDaySumRepository)
], SalesStatisticsService.prototype, "salesDaySumRepository", void 0);
exports.SalesStatisticsService = SalesStatisticsService;
