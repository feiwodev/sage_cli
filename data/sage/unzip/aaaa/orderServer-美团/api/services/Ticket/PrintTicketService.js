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
const repositories_1 = require("../../repositories");
const PrintTicketSeqNoRepository_1 = require("../../repositories/Ticket/PrintTicketSeqNoRepository");
const ReprintRightRepository_1 = require("../../repositories/BusniessRight/ReprintRightRepository");
const ReprintLogRepository_1 = require("../../repositories/Ticket/ReprintLogRepository");
class PrintTicketService {
    constructor() {
    }
    async getPrintTicketNo(productId, salesWinId) {
        try {
            return await this.printTicketSeqNoRepository.findSeqNo(productId, salesWinId);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async setPrintTicketNo(productId, salesWinId, seqNo = 1, endId) {
        try {
            return await this.printTicketSeqNoRepository.updateSeqNo(productId, salesWinId, seqNo, endId);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async getReprintRight(userId) {
        try {
            return await this.reprintRightRepository.findListByUser(userId);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async addReprintLog(reprintLog) {
        try {
            return await this.reprintLogRepository.insertReprintLog(reprintLog);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
}
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", PrintTicketSeqNoRepository_1.PrintTicketSeqNoRepository)
], PrintTicketService.prototype, "printTicketSeqNoRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", ReprintRightRepository_1.ReprintRightRepository)
], PrintTicketService.prototype, "reprintRightRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", ReprintLogRepository_1.ReprintLogRepository)
], PrintTicketService.prototype, "reprintLogRepository", void 0);
exports.PrintTicketService = PrintTicketService;
