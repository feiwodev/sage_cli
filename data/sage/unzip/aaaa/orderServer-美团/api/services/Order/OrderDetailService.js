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
const OrderDetailRepository_1 = require("../../repositories/Order/OrderDetailRepository");
const OrderDetailTicketRepository_1 = require("../../repositories/Order/OrderDetailTicketRepository");
const OrderDetailChangeRepository_1 = require("../../repositories/Order/OrderDetailChangeRepository");
const OrderDetailPersonRepository_1 = require("../../repositories/Order/OrderDetailPersonRepository");
const moment = require("moment");
class OrderDetailService {
    constructor() {
    }
    async getOrderDetailListWithOrderId(orderId) {
        try {
            return this.orderDetailRepository.findByOrderId(orderId);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async addOrderDetail(orderEntity, businessTicketEntity) {
        try {
            let orderDetail = {
                orderId: orderEntity.orderId,
                seqNo: 1,
                productId: businessTicketEntity.ticket.product.id,
                crowdKindId: businessTicketEntity.crowdKind.id,
                priceId: businessTicketEntity.price.id,
                discountSchemeId: businessTicketEntity.discountScheme.id,
                discount: businessTicketEntity.discountScheme.quantity,
                quantity: orderEntity.quantity,
                price: businessTicketEntity.businessPrice.actualSalePrice,
                amount: Number(businessTicketEntity.businessPrice.actualSalePrice * orderEntity.quantity)
            };
            orderDetail = await this.orderDetailRepository.createOrderDetail(orderDetail);
            let orderDetailTicket = {
                orderDetailId: orderDetail.id,
                startDate: moment(orderEntity.useStartDate).format('YYYY-MM-DD HH:mm:ss'),
                endDate: moment(orderEntity.useEndDate).format('YYYY-MM-DD HH:mm:ss'),
                ticketNumber: orderDetail.quantity,
                weekendLimit: 1,
                weekLimit: '1111111',
                dayLimit: '1111111'
            };
            orderDetailTicket = await this.addOrderDetailTicket(orderDetailTicket);
            if (orderEntity.personList) {
                orderEntity.personList.forEach((o) => {
                    o.orderDetailId = orderDetail.id;
                });
                orderEntity.personList = await this.addOrderDetailPersonList(orderEntity.personList);
            }
            let orderDetailChange = {
                orderDetailId: orderDetail.id,
                seqNo: 1,
                orderQuantity: orderDetail.quantity,
                realQuantity: 0
            };
            orderDetailChange = await this.addOrderDetailChange(orderDetailChange);
            return orderDetail;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getOrderDetailTicket(orderDetailId) {
        try {
            return await this.orderDetailTicketRepository.findByOrderDetailId(orderDetailId);
        }
        catch (error) {
            log_1.logger.error('获取凭证明细门票异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addOrderDetailTicket(orderDetailTicket) {
        try {
            return await this.orderDetailTicketRepository.createOrderDetailTicket(orderDetailTicket);
        }
        catch (error) {
            log_1.logger.error('添加凭证明细门票异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async updateOrderDetailTicket(orderDetailTicket) {
        try {
            return await this.orderDetailTicketRepository.updateOrderDetailTicket(orderDetailTicket);
        }
        catch (error) {
            log_1.logger.error('更新凭证明细门票异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async getOrderDetailChange(orderDetailId) {
        try {
            return await this.orderDetailChangeRepository.findByOrderDetailId(orderDetailId);
        }
        catch (error) {
            log_1.logger.error('获取凭证明细变更日志异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addOrderDetailChange(orderDetailChange) {
        try {
            return await this.orderDetailChangeRepository.createOrderDetailChange(orderDetailChange);
        }
        catch (error) {
            log_1.logger.error('添加凭证明细变更日志异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async getOrderDetailPersonList(orderDetailId) {
        try {
            return await this.orderDetailPersonRepository.findOrderDetailPersons(orderDetailId);
        }
        catch (error) {
            log_1.logger.error('获取凭证明细个人信息异常');
            log_1.logger.error(error);
            throw error;
        }
    }
    async addOrderDetailPersonList(orderDetailPersonList) {
        try {
            return await this.orderDetailPersonRepository.createOrderDetailPersons(orderDetailPersonList);
        }
        catch (error) {
            log_1.logger.error('添加凭证明细个人信息异常');
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderDetailRepository_1.OrderDetailRepository)
], OrderDetailService.prototype, "orderDetailRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderDetailTicketRepository_1.OrderDetailTicketRepository)
], OrderDetailService.prototype, "orderDetailTicketRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderDetailChangeRepository_1.OrderDetailChangeRepository)
], OrderDetailService.prototype, "orderDetailChangeRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderDetailPersonRepository_1.OrderDetailPersonRepository)
], OrderDetailService.prototype, "orderDetailPersonRepository", void 0);
exports.OrderDetailService = OrderDetailService;
