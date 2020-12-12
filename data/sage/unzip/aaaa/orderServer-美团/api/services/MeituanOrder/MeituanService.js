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
const errors = require("../../../config/errors");
const log_1 = require("../../../middleware/log");
const models_1 = require("../../models");
const service_1 = require("../../../lib/service");
const OrderService_1 = require("../Order/OrderService");
const OrderTakeTicketService_1 = require("../Order/OrderTakeTicketService");
const BusinessTicketService_1 = require("../Ticket/BusinessTicket/BusinessTicketService");
const MeituanAPI_1 = require("./MeituanAPI");
const _ = require("lodash");
const moment = require("moment");
class MeituanService {
    constructor() {
    }
    checkSign(requestBody) {
        try {
            if (this.meituanAPI.validSign(requestBody)) {
                return true;
            }
            return false;
        }
        catch (error) {
            throw error || '验证美团BD签名失败';
        }
    }
    async queryProductPrice(orderBody) {
        try {
            const businessTicketEntity = await this.businessTicketService.getBusinessTicketWithBusinessPriceId(orderBody.partnerDealId, true);
            if (businessTicketEntity) {
                const days = moment(orderBody.endTime).diff(moment(orderBody.startTime), 'days');
                const productPriceList = [];
                for (let i = 0; i <= days; i++) {
                    productPriceList.push({
                        partnerDealId: orderBody.partnerDealId,
                        date: moment(orderBody.startTime).add(i, 'days').format('YYYY-MM-DD'),
                        marketPrice: businessTicketEntity.ticket.product.basicPrice,
                        mtPrice: businessTicketEntity.ticket.product.basicPrice,
                        settlementPrice: businessTicketEntity.businessPrice.actualSalePrice,
                        stock: 999999
                    });
                }
                return productPriceList;
            }
            return null;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async createOrder(orderBody) {
        try {
            let orderEntity = {
                type: 0,
                traderNumber: orderBody.orderId,
                productId: orderBody.partnerDealId,
                quantity: orderBody.quantity,
                useStartDate: moment(orderBody.travelDate).format('YYYY-MM-DD HH:mm:ss'),
                useEndDate: moment(orderBody.travelDate).format('YYYY-MM-DD 23:59:59'),
                isPay: true,
                channelName: '美团',
                contactName: '',
                idCard: '',
                phone: '',
                personList: []
            };
            let order = await this.orderService.queryOrder(orderBody.orderId);
            if (order) {
                return order;
            }
            if (orderBody.contactPerson) {
                if (orderBody.contactPerson.name) {
                    orderEntity.contactName = orderBody.contactPerson.name;
                }
                if (orderBody.contactPerson.mobile) {
                    orderEntity.phone = orderBody.contactPerson.mobile;
                }
                if (orderBody.contactPerson.credentials) {
                    _.forEach(orderBody.contactPerson.credentials, (value) => {
                        orderEntity.idCard = value;
                    });
                }
            }
            if (orderBody.visitors && orderBody.visitors.length) {
                for (const visitor of orderBody.visitors) {
                    const person = {
                        name: visitor.name,
                        phone: visitor.mobile,
                        idCard: ''
                    };
                    if (visitor.credentials) {
                        _.forEach(visitor.credentials, (value) => {
                            person.idCard = value;
                        });
                    }
                    orderEntity.personList.push(person);
                }
            }
            return await this.orderService.addTouristOrder(orderEntity);
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async closeOrder(orderBody) {
        try {
            let orderEntity = await this.orderService.queryOrder(orderBody.orderId);
            if (orderEntity) {
                if (orderEntity.status === 0) {
                    return this.orderService.closeOrder(orderEntity.traderNumber);
                }
                else if (orderEntity.status === -1) {
                    return true;
                }
                else if (orderEntity.status === 1) {
                    throw errors.ORDER_ERRORS.orderCanceled;
                }
                else {
                    throw errors.ORDER_ERRORS.orderUsed;
                }
            }
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async payOrder(orderBody) {
        try {
            let orderEntity = await this.orderService.queryOrder(orderBody.orderId);
            if (orderEntity) {
                if (orderEntity.status === 0) {
                    try {
                        await models_1.db.beginTransaction();
                        const order = await this.orderService._getOrder(orderEntity);
                        order.businessId = orderEntity.businessTicketEntity.businessId;
                        order.id = orderEntity.id;
                        order.number = orderEntity.orderNumber;
                        const ticketData = await this.orderTakeTicketService.takeOrder(order, orderEntity, {
                            id: orderEntity.orderDetail.id,
                            businessTicketEntity: orderEntity.businessTicketEntity
                        });
                        if (ticketData) {
                            orderEntity.ticketNos = ticketData.ticketNos;
                            orderEntity.ticketNoPics = ticketData.ticketNoPics;
                        }
                        await models_1.db.commitTransaction();
                        return orderEntity;
                    }
                    catch (error) {
                        await models_1.db.rollbackTransaction();
                        log_1.logger.error(error);
                        throw error;
                    }
                    finally {
                        models_1.db.closeTransaction();
                    }
                }
                else if (orderEntity.status === 2) {
                    return orderEntity;
                }
                else if (orderEntity.status === -1) {
                    throw errors.ORDER_ERRORS.orderClosed;
                }
                else if (orderEntity.status === 1) {
                    throw errors.ORDER_ERRORS.orderCanceled;
                }
                else {
                    throw errors.ORDER_ERRORS.orderUsed;
                }
            }
            else {
                throw errors.ORDER_ERRORS.orderNoExisted;
            }
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async refundOrder(orderBody) {
        try {
            const orderEntity = await this.orderService.queryOrder(orderBody.orderId);
            if (orderEntity) {
                if (orderEntity.status === 2) {
                    const result = await this.orderService.refundOrder(orderEntity.traderNumber, orderBody.refundId, orderBody.voucherList);
                    if (result && result.status) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
                else if (orderEntity.status === -1) {
                    throw errors.ORDER_ERRORS.orderClosed;
                }
                else if (orderEntity.status === 1) {
                    const refundOrderLogs = await this.orderService._getRefundOrderLogs(orderBody.refundId);
                    if (refundOrderLogs && refundOrderLogs.length) {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                }
                else {
                    throw errors.ORDER_ERRORS.orderUsed;
                }
            }
            else {
                throw errors.ORDER_ERRORS.orderNoExisted;
            }
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async queryOrder(orderBody) {
        try {
            let orderEntity = await this.orderService.queryOrder(orderBody.orderId);
            if (orderEntity) {
                return orderEntity;
            }
            else {
                throw errors.ORDER_ERRORS.orderNoExisted;
            }
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    service_1.Service(),
    __metadata("design:type", OrderService_1.OrderService)
], MeituanService.prototype, "orderService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", OrderTakeTicketService_1.OrderTakeTicketService)
], MeituanService.prototype, "orderTakeTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", BusinessTicketService_1.BusinessTicketService)
], MeituanService.prototype, "businessTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", MeituanAPI_1.MeituanAPI)
], MeituanService.prototype, "meituanAPI", void 0);
exports.MeituanService = MeituanService;
