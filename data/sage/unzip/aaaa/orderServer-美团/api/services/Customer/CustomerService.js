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
const CustomerRepository_1 = require("../../repositories/Customer/CustomerRepository");
const ChannelRepository_1 = require("../../repositories/Customer/ChannelRepository");
const GuideRepository_1 = require("../../repositories/Customer/GuideRepository");
const TouristsAddressRepository_1 = require("../../repositories/Customer/TouristsAddressRepository");
const ManagerRepository_1 = require("../../repositories/Customer/ManagerRepository");
class CustomerService {
    constructor() {
    }
    async getCustomerListWithCategory(customerCategoryId, keyword, limit, offset) {
        try {
            return await this.customerRepository.findListByCategory(customerCategoryId, keyword, limit, offset);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async getManagerListWithCustomer(customerId, keyword, limit, offset) {
        try {
            return await this.managerRepository.findListByCustomer(customerId, keyword, limit, offset);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async getGuideList(keyword, limit, offset) {
        try {
            return await this.guideRepository.findList(keyword, limit, offset);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async getTouristsAddressList(keyword, limit, offset) {
        try {
            return await this.touristsAddressRepository.findList(keyword, limit, offset);
        }
        catch (error) {
            log_1.logger.error(error.message);
            throw error;
        }
    }
    async getTouristsAddress(touristsAddressId) {
        try {
            return await this.touristsAddressRepository.findById(touristsAddressId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getTouristsAddressWithName(name) {
        try {
            return await this.touristsAddressRepository.findByName(name);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getChannel(channelId) {
        try {
            return await this.channelRepository.findById(channelId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getChannelWithName(name, channelCategoryId = 6) {
        try {
            let channel = await this.channelRepository.findByName(name);
            if (!channel) {
                channel = {
                    name,
                    code: name,
                    channelCategoryId
                };
                return await this.channelRepository.createChannel(channel);
            }
            return channel;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getCustomer(customerId) {
        try {
            return await this.customerRepository.findById(customerId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getCustomerWithName(name, customerCategoryId = 3, regionalId = 1) {
        try {
            let customer = await this.customerRepository.findByName(name);
            if (!customer) {
                customer = {
                    name,
                    code: name,
                    customerCategoryId,
                    regionalId
                };
                return await this.customerRepository.createCustomer(customer);
            }
            return customer;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getGuide(guideId) {
        try {
            return await this.guideRepository.findById(guideId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getGuideWithName(name, regionalId = 1) {
        try {
            let guide = await this.guideRepository.findByName(name);
            if (!guide) {
                guide = {
                    name,
                    code: name,
                    regionalId
                };
                return await this.guideRepository.createGuide(guide);
            }
            return guide;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", TouristsAddressRepository_1.TouristsAddressRepository)
], CustomerService.prototype, "touristsAddressRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", CustomerRepository_1.CustomerRepository)
], CustomerService.prototype, "customerRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", ManagerRepository_1.ManagerRepository)
], CustomerService.prototype, "managerRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", ChannelRepository_1.ChannelRepository)
], CustomerService.prototype, "channelRepository", void 0);
__decorate([
    Repository_1.Repository(),
    __metadata("design:type", GuideRepository_1.GuideRepository)
], CustomerService.prototype, "guideRepository", void 0);
exports.CustomerService = CustomerService;
