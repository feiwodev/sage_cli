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
const SalesWinRightRepository_1 = require("../../../repositories/BusniessRight/SalesWinRightRepository");
const UserRightRepository_1 = require("../../../repositories/BusniessRight/UserRightRepository");
const UserPostRepository_1 = require("../../../repositories/User/UserPostRepository");
const _ = require("lodash");
class BusinessRightService {
    constructor() {
    }
    async getUseBusinessPriceIds(salesWinId, userId) {
        try {
            let useBusinessPriceIds = [];
            let salesWinBusinessPriceIds = [];
            let userBusinessPriceIds = [];
            if (salesWinId && userId) {
                let isAdmin = false;
                const userPostList = await this.userPostRepository.findByUser(userId);
                if (userPostList && userPostList.length) {
                    if (_.findIndex(userPostList, { postId: 1 }) >= 0) {
                        isAdmin = true;
                    }
                    else {
                        isAdmin = false;
                    }
                }
                salesWinBusinessPriceIds = await this.salesWinRightRepository.findBusinessPriceIds(salesWinId);
                if (isAdmin) {
                    useBusinessPriceIds = salesWinBusinessPriceIds;
                }
                else {
                    userBusinessPriceIds = await this.userRightRepository.findBusinessPriceIds(userId);
                    if (salesWinBusinessPriceIds && userBusinessPriceIds) {
                        useBusinessPriceIds = _.filter(salesWinBusinessPriceIds, (sid) => {
                            return _.find(userBusinessPriceIds, (uid) => { return sid === uid; });
                        });
                    }
                }
            }
            return useBusinessPriceIds;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SalesWinRightRepository_1.SalesWinRightRepository)
], BusinessRightService.prototype, "salesWinRightRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", UserRightRepository_1.UserRightRepository)
], BusinessRightService.prototype, "userRightRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", UserPostRepository_1.UserPostRepository)
], BusinessRightService.prototype, "userPostRepository", void 0);
exports.BusinessRightService = BusinessRightService;
