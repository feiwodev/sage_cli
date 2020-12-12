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
const VenueSessionRepository_1 = require("../../../repositories/Venue/VenueSessionRepository");
const VenueSessionSalesHoldRepository_1 = require("../../../repositories/Venue/VenueSessionSalesHoldRepository");
const VenueSeatPriceRepository_1 = require("../../../repositories/Venue/VenueSeatPriceRepository");
const VenueShowScheduleRepository_1 = require("../../../repositories/Venue/VenueShowScheduleRepository");
const VoucherVenueDetailRepository_1 = require("../../../repositories/Voucher/VoucherVenueDetailRepository");
const _ = require("lodash");
const moment = require("moment");
class VenueTicketService {
    constructor() {
    }
    async getVenueSessionByDay(productId, date, isBefore = false) {
        try {
            let venueSessionList = [];
            let venueSeatPriceList = [];
            let venueShowScheduleList = await this.venueShowScheduleRepository.findByProductAndDate(productId, date, isBefore);
            if (venueShowScheduleList && venueShowScheduleList.length > 0) {
                let venueSessionIds = _.map(venueShowScheduleList, 'venueSessionId');
                venueSessionList = await this.venueSessionRepository.findListByIds(venueSessionIds);
                venueSeatPriceList = await this.venueSeatPriceRepository.findListByVenueSessionIds(venueSessionIds);
                for (let venueSession of venueSessionList) {
                    let venueShowSchedule = _.find(venueShowScheduleList, {
                        venueSessionId: venueSession.id
                    });
                    let venueSeatPrices = _.filter(venueSeatPriceList, {
                        venueSessionId: venueSession.id
                    });
                    if (venueShowSchedule) {
                        venueSession.venueShowScheduleId = venueShowSchedule.id;
                        venueSession.startDate = moment(venueShowSchedule.startDate).format('YYYY-MM-DD HH:mm:ss');
                        venueSession.endDate = moment(venueShowSchedule.endDate).format('YYYY-MM-DD HH:mm:ss');
                        venueSession.remaining = venueShowSchedule.remaining;
                        venueSession.reserved = venueShowSchedule.reserved;
                    }
                    if (venueSeatPrices && venueSeatPrices.length) {
                        venueSession.venueSeatPrices = venueSeatPrices;
                    }
                }
            }
            return venueSessionList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getVoucherVenueSession(voucherDetailId) {
        try {
            let voucherVenueDetail = await this.voucherVenueDetailRepository.findByVoucherDetail(voucherDetailId);
            if (voucherVenueDetail) {
                let venueSession = await this.venueSessionRepository.findListById(voucherVenueDetail.venueSessionId);
                if (venueSession) {
                    let venueShowSchedule = await this.venueShowScheduleRepository.findByVenueSessionAndDate(voucherVenueDetail.venueSessionId, voucherVenueDetail.sessionDate);
                    if (venueShowSchedule) {
                        venueSession.venueShowScheduleId = venueShowSchedule.id;
                        venueSession.startDate = moment(venueShowSchedule.startDate).format('YYYY-MM-DD HH:mm:ss');
                        venueSession.endDate = moment(venueShowSchedule.endDate).format('YYYY-MM-DD HH:mm:ss');
                        venueSession.remaining = venueShowSchedule.remaining;
                        venueSession.reserved = venueShowSchedule.reserved;
                    }
                }
                return venueSession;
            }
            return null;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async checkVenueSessionRemaining(venueShowScheduleId, quantity) {
        try {
            let venueShowSchedule = await this.venueShowScheduleRepository.findById(venueShowScheduleId);
            if (venueShowSchedule) {
                if (venueShowSchedule.remaining >= quantity) {
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async salesVenueSession(venueShowScheduleId, quantity) {
        try {
            let venueShowSchedule = await this.venueShowScheduleRepository.findById(venueShowScheduleId);
            if (venueShowSchedule) {
                quantity = Number(quantity);
                if (venueShowSchedule.remaining >= quantity) {
                    venueShowSchedule.remaining -= quantity;
                    venueShowSchedule.realSales += quantity;
                    this.venueShowScheduleRepository.updateSalesQuantity(venueShowSchedule.id, venueShowSchedule.remaining, venueShowSchedule.realSales);
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async checkVenueSessionSalesHold() {
        try {
            let venueSessionSalesHoldList = await this.venueSessionSalesHoldRepository.findFailedList(moment().add(-15, 'minutes').format('YYYY-MM-DD HH:mm:ss'));
            if (venueSessionSalesHoldList && venueSessionSalesHoldList.length > 0) {
                for (let venueSessionSalesHold of venueSessionSalesHoldList) {
                    let venueShowSchedule = await this.venueShowScheduleRepository.findById(venueSessionSalesHold.venueShowScheduleId);
                    if (venueShowSchedule) {
                        await this.venueShowScheduleRepository.updateSalesQuantity(venueShowSchedule.id, venueShowSchedule.remaining + venueSessionSalesHold.quantity, venueShowSchedule.realSales - venueSessionSalesHold.quantity);
                    }
                    else {
                        await this.venueSessionSalesHoldRepository.deleteSalesHold(venueSessionSalesHold.id);
                    }
                }
            }
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async holdVenueSessionSalesQuantity(venueShowScheduleId, voucherNumber, quantity) {
        try {
            let venueSessionSalesHold = await this.venueSessionSalesHoldRepository.findByVoucher(venueShowScheduleId, voucherNumber);
            if (venueSessionSalesHold) {
                let venueShowSchedule = await this.venueShowScheduleRepository.findById(venueSessionSalesHold.venueShowScheduleId);
                if (venueShowSchedule) {
                    await this.venueShowScheduleRepository.updateSalesQuantity(venueShowSchedule.id, venueShowSchedule.remaining + venueSessionSalesHold.quantity, venueShowSchedule.realSales - venueSessionSalesHold.quantity);
                }
                else {
                    await this.venueSessionSalesHoldRepository.deleteSalesHold(venueSessionSalesHold.id);
                }
            }
            if (await this.salesVenueSession(venueShowScheduleId, quantity)) {
                await this.venueSessionSalesHoldRepository.createSalesHold({
                    venueShowScheduleId: venueShowScheduleId,
                    voucherNumber: voucherNumber,
                    quantity: quantity,
                    holdTime: moment().format('YYYY-MM-DD HH:mm:ss').toString()
                });
                return true;
            }
            return false;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async makeVenueSessionSalesHold(venueShowScheduleId, voucherNumber, quantity) {
        try {
            let venueSessionSalesHold = await this.venueSessionSalesHoldRepository.findByVoucher(venueShowScheduleId, voucherNumber);
            if (venueSessionSalesHold) {
                if (venueSessionSalesHold.quantity <= quantity) {
                    await this.venueSessionSalesHoldRepository.deleteSalesHold(venueSessionSalesHold.id);
                }
                else if (venueSessionSalesHold.quantity > quantity) {
                    await this.venueSessionSalesHoldRepository.updateSalesHold(venueSessionSalesHold.id, venueSessionSalesHold.quantity + quantity);
                }
                return true;
            }
            return false;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VenueSessionRepository_1.VenueSessionRepository)
], VenueTicketService.prototype, "venueSessionRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VenueSessionSalesHoldRepository_1.VenueSessionSalesHoldRepository)
], VenueTicketService.prototype, "venueSessionSalesHoldRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VenueShowScheduleRepository_1.VenueShowScheduleRepository)
], VenueTicketService.prototype, "venueShowScheduleRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VenueSeatPriceRepository_1.VenueSeatPriceRepository)
], VenueTicketService.prototype, "venueSeatPriceRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", VoucherVenueDetailRepository_1.VoucherVenueDetailRepository)
], VenueTicketService.prototype, "voucherVenueDetailRepository", void 0);
exports.VenueTicketService = VenueTicketService;
