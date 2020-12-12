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
const CheckTicketLogRepository_1 = require("../../repositories/AccessTicket/CheckTicketLogRepository");
class CheckTicketLogService {
    async getCheckTicketLogWithNumber(number) {
        try {
            return await this.checkTicketLogRepository.findByNumber(number);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async getCheckTicketLogsWithNumber(number) {
        try {
            return await this.checkTicketLogRepository.findListByNumber(number);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async getCheckTicketLogsWithVDTId(voucherDetailTicketId) {
        try {
            return await this.checkTicketLogRepository.findByVoucherDetailTicketId(voucherDetailTicketId);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async getCheckTicketLogsWithVDTIdAndNumber(voucherDetailTicketId, number) {
        try {
            return await this.checkTicketLogRepository.findByVoucherDetailTicketIdAndNumber(voucherDetailTicketId, number);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
}
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", CheckTicketLogRepository_1.CheckTicketLogRepository)
], CheckTicketLogService.prototype, "checkTicketLogRepository", void 0);
exports.CheckTicketLogService = CheckTicketLogService;
