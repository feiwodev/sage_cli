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
const BusinessTicketRepository_1 = require("../../../repositories/BusinessTicket/BusinessTicketRepository");
const BusinessRightService_1 = require("./BusinessRightService");
const SalesSchemeRepository_1 = require("../../../repositories/Business/SalesSchemeRepository");
const TicketRepository_1 = require("../../../repositories/Ticket/TicketRepository");
const BusinessRepository_1 = require("../../../repositories/BusinessTicket/BusinessRepository");
const CrowdKindRepository_1 = require("../../../repositories/BusinessTicket/CrowdKindRepository");
const BusinessPriceRepository_1 = require("../../../repositories/BusinessTicket/BusinessPriceRepository");
const PriceRepository_1 = require("../../../repositories/BusinessTicket/PriceRepository");
const DiscountSchemeRepository_1 = require("../../../repositories/BusinessTicket/DiscountSchemeRepository");
const BusinessComposePriceRepository_1 = require("../../../repositories/BusinessTicket/BusinessComposePriceRepository");
const AccessTicketSetRepository_1 = require("../../../repositories/AccessTicket/AccessTicketSetRepository");
const _ = require("lodash");
const moment = require("moment");
class BusinessTicketService {
    constructor() {
    }
    async getUseBusinessTicketList(salesWinId, userId, businessId) {
        try {
            let businessTicketList = [];
            let useBusinessPriceIds = await this.businessRightService.getUseBusinessPriceIds(salesWinId, userId);
            if (useBusinessPriceIds && useBusinessPriceIds.length) {
                let currentSalesScheme = await this.salesSchemeRepository.getCurrentSalesScheme();
                if (currentSalesScheme) {
                    businessTicketList = await this.businessTicketRepository.findUseBusinessTickets(currentSalesScheme.id, businessId, useBusinessPriceIds);
                }
                if (businessTicketList.length) {
                    businessTicketList = await this.setBusinessTicketList(businessTicketList);
                }
            }
            return businessTicketList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getBusinessTicketList(businessId, isOnLine, limit, offset, isCascLoad = true) {
        try {
            let businessTicketList = await this.businessTicketRepository.findBusinessTickets(businessId, isOnLine, limit, offset);
            if (isCascLoad) {
                if (businessTicketList && businessTicketList.length) {
                    businessTicketList = await this.setBusinessTicketList(businessTicketList);
                }
            }
            return businessTicketList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getBusinessTicketWithBusinessPriceId(businessPriceId, isCascLoad = true) {
        try {
            let businessTicket = await this.businessTicketRepository.findByBusinessPriceId(businessPriceId);
            if (isCascLoad) {
                businessTicket = this.setBusinessTicket(businessTicket);
            }
            return businessTicket;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getBusinessTicket(businessTicketId, salesSchemeId, isCascLoad = true) {
        try {
            let businessTicket = await this.businessTicketRepository.findBySalesSchemeId(businessTicketId, salesSchemeId);
            if (isCascLoad) {
                businessTicket = this.setBusinessTicket(businessTicket);
            }
            return businessTicket;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getBusinessTicketWithBusinessProductId(businessId, productId, salesSchemeId, crowdKindId, priceId, isCascLoad = true) {
        try {
            let businessTicket = await this.businessTicketRepository.findByBusinessProductId(businessId, productId, salesSchemeId, crowdKindId, priceId);
            if (isCascLoad) {
                businessTicket = this.setBusinessTicket(businessTicket);
            }
            return businessTicket;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async setBusinessTicketList(businessTicketList) {
        try {
            let businessTicketIds = [];
            let ticketIds = [];
            let businessIds = [];
            let crowdKindIds = [];
            let businessPriceIds = [];
            let priceIds = [];
            let discountSchemeIds = [];
            let salesSchemeIds = [];
            for (let businessTicket of businessTicketList) {
                businessTicketIds.push(businessTicket.id);
                businessIds.push(businessTicket.businessId);
                ticketIds.push(businessTicket.ticketId);
                crowdKindIds.push(businessTicket.crowdKindId);
                businessPriceIds.push(businessTicket.businessPriceId);
                priceIds.push(businessTicket.priceId);
                discountSchemeIds.push(businessTicket.discountSchemeId);
                salesSchemeIds.push(businessTicket.salesSchemeId);
            }
            let businessList = await this.businessRepository.findByIds(_.uniq(businessIds));
            let ticketList = await this.ticketRepository.findByIds(_.uniq(ticketIds));
            let crowdKindList = await this.crowdkindRepository.findByIds(_.uniq(crowdKindIds));
            let businessPriceList = await this.businessPriceRepository.findByIds(_.uniq(businessPriceIds));
            let priceList = await this.priceRepository.findByIds(_.uniq(priceIds));
            let discountSchemeList = await this.discountSchemeRepository.findByIds(_.uniq(discountSchemeIds));
            let businessComposePriceList = await this.businessComposePriceRepository.findList();
            let accessTicketSetList = await this.accessTicketSetRepository.findListByBusinessTickets(_.uniq(businessTicketIds));
            let salesSchemeList = await this.salesSchemeRepository.findByIds(_.uniq(salesSchemeIds));
            for (let businessTicket of businessTicketList) {
                businessTicket.business = _.find(businessList, { id: businessTicket.businessId });
                businessTicket.ticket = _.cloneDeep(_.find(ticketList, { id: businessTicket.ticketId }));
                businessTicket.crowdKind = _.find(crowdKindList, { id: businessTicket.crowdKindId });
                businessTicket.businessPrice = _.find(businessPriceList, { id: businessTicket.businessPriceId });
                businessTicket.price = _.find(priceList, { id: businessTicket.priceId });
                businessTicket.discountScheme = _.find(discountSchemeList, { id: businessTicket.discountSchemeId });
                businessTicket.salesScheme = _.find(salesSchemeList, { id: businessTicket.salesSchemeId });
                businessTicket.accessTicketSetList = _.filter(accessTicketSetList, { id: businessTicket.id });
                if (businessTicket.ticket && businessTicket.ticket.product.subProductList) {
                    for (let subProduct of businessTicket.ticket.product.subProductList) {
                        const ticket = await this.ticketRepository.findByProductId(subProduct.id);
                        const businessComposePrice = _.find(businessComposePriceList, { ticketId: ticket.id, businessPriceId: businessTicket.businessPriceId });
                        subProduct.actualAmount = businessComposePrice.actualSalePrice;
                    }
                }
                this.setBusinessTicketValidate(businessTicket);
            }
            return businessTicketList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async setBusinessTicket(businessTicket) {
        try {
            if (businessTicket) {
                businessTicket.business = await this.businessRepository.findById(businessTicket.businessId);
                businessTicket.ticket = await this.ticketRepository.findById(businessTicket.ticketId);
                businessTicket.crowdKind = await this.crowdkindRepository.findById(businessTicket.crowdKindId);
                businessTicket.businessPrice = await this.businessPriceRepository.findById(businessTicket.businessPriceId);
                businessTicket.price = await this.priceRepository.findById(businessTicket.priceId);
                businessTicket.discountScheme = await this.discountSchemeRepository.findById(businessTicket.discountSchemeId);
                businessTicket.salesScheme = await this.salesSchemeRepository.findById(businessTicket.salesSchemeId);
                if (businessTicket.ticket && businessTicket.ticket.product.subProductList) {
                    for (let subProduct of businessTicket.ticket.product.subProductList) {
                        const ticket = await this.ticketRepository.findByProductId(subProduct.id);
                        const businessComposePrice = await this.businessComposePriceRepository.findByTicket(ticket.id, businessTicket.businessPriceId);
                        subProduct.actualAmount = businessComposePrice.actualSalePrice;
                    }
                }
                businessTicket.accessTicketSetList = await this.accessTicketSetRepository.findListByBusinessTicket(businessTicket.id);
                this.setBusinessTicketValidate(businessTicket);
            }
            else {
                businessTicket = null;
            }
            return businessTicket;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    setBusinessTicketValidate(businessTicket, startDate) {
        try {
            businessTicket.startDate = moment(startDate || new Date());
            if (businessTicket.activeNum > 0) {
                switch (businessTicket.activeUnits) {
                    case 0:
                        businessTicket.startDate = moment(businessTicket.startDate).add(businessTicket.activeNum, 'minutes');
                        break;
                    case 1:
                        businessTicket.startDate = moment(businessTicket.startDate).add(businessTicket.activeNum, 'hours');
                        break;
                    case 2:
                        businessTicket.startDate = moment(businessTicket.startDate).add(businessTicket.activeNum, 'days');
                        break;
                    case 3:
                        businessTicket.startDate = moment(businessTicket.startDate).add(businessTicket.activeNum, 'weeks');
                        break;
                    case 4:
                        businessTicket.startDate = moment(businessTicket.startDate).add(businessTicket.activeNum, 'months');
                        break;
                    case 5:
                        businessTicket.startDate = moment(businessTicket.startDate).add(businessTicket.activeNum, 'years');
                        break;
                }
            }
            businessTicket.endDate = businessTicket.startDate;
            if (businessTicket.validityNum > 0) {
                switch (businessTicket.validityUnits) {
                    case 0:
                        businessTicket.endDate = moment(businessTicket.endDate).add(businessTicket.validityNum, 'minutes').format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 1:
                        businessTicket.endDate = moment(businessTicket.endDate).add(businessTicket.validityNum, 'hours').format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 2:
                        businessTicket.endDate = moment(businessTicket.endDate).add(businessTicket.validityNum, 'days').format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 3:
                        businessTicket.endDate = moment(businessTicket.endDate).add(businessTicket.validityNum, 'weeks').format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 4:
                        businessTicket.endDate = moment(businessTicket.endDate).add(businessTicket.validityNum, 'months').format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 5:
                        businessTicket.endDate = moment(businessTicket.endDate).add(businessTicket.validityNum, 'years').format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 6:
                        businessTicket.endDate = moment(businessTicket.endDate).add(businessTicket.validityNum - 1, 'days').endOf('day')
                            .format('YYYY-MM-DD 23:59:59');
                        break;
                    case 7:
                        businessTicket.endDate = moment(businessTicket.endDate).add(businessTicket.validityNum - 1, 'months').endOf('month')
                            .format('YYYY-MM-DD 23:59:59');
                        break;
                    case 8:
                        businessTicket.endDate = moment(businessTicket.endDate).add(businessTicket.validityNum - 1, 'years').endOf('year')
                            .format('YYYY-MM-DD 23:59:59');
                        break;
                }
            }
            businessTicket.startDate = businessTicket.startDate.format('YYYY-MM-DD HH:mm:ss');
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", AccessTicketSetRepository_1.AccessTicketSetRepository)
], BusinessTicketService.prototype, "accessTicketSetRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", BusinessTicketRepository_1.BusinessTicketRepository)
], BusinessTicketService.prototype, "businessTicketRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", BusinessRepository_1.BusinessRepository)
], BusinessTicketService.prototype, "businessRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", BusinessComposePriceRepository_1.BusinessComposePriceRepository)
], BusinessTicketService.prototype, "businessComposePriceRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", BusinessPriceRepository_1.BusinessPriceRepository)
], BusinessTicketService.prototype, "businessPriceRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", CrowdKindRepository_1.CrowdKindRepository)
], BusinessTicketService.prototype, "crowdkindRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", DiscountSchemeRepository_1.DiscountSchemeRepository)
], BusinessTicketService.prototype, "discountSchemeRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", PriceRepository_1.PriceRepository)
], BusinessTicketService.prototype, "priceRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SalesSchemeRepository_1.SalesSchemeRepository)
], BusinessTicketService.prototype, "salesSchemeRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", TicketRepository_1.TicketRepository)
], BusinessTicketService.prototype, "ticketRepository", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", BusinessRightService_1.BusinessRightService)
], BusinessTicketService.prototype, "businessRightService", void 0);
exports.BusinessTicketService = BusinessTicketService;
