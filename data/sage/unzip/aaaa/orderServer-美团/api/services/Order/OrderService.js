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
const repositories_1 = require("../../repositories");
const OrderRepository_1 = require("../../repositories/Order/OrderRepository");
const OrderLogRepository_1 = require("../../repositories/Order/OrderLogRepository");
const OrderVoucherRepository_1 = require("../../repositories/Order/OrderVoucherRepository");
const OrderEntity_1 = require("../../entities/Order/OrderEntity");
const service_1 = require("../../../lib/service");
const BusinessTicketService_1 = require("../Ticket/BusinessTicket/BusinessTicketService");
const CustomerService_1 = require("../Customer/CustomerService");
const OrderDetailService_1 = require("./OrderDetailService");
const OrderTakeTicketService_1 = require("./OrderTakeTicketService");
const RefundTicketService_1 = require("../Ticket/RefundTicketService");
const moment = require("moment");
const order_config_1 = require("../../../config/order_config");
class OrderService {
    constructor() {
    }
    async getOrderProductList(businessPriceId, businessId, isOnLine, limit, offset) {
        try {
            let orderProduct;
            const orderProductList = [];
            let busnissTicketList = [];
            if (businessPriceId) {
                const busnissTicket = await this.businessTicketService.getBusinessTicketWithBusinessPriceId(businessPriceId);
                if (busnissTicket) {
                    busnissTicketList.push(busnissTicket);
                }
            }
            else {
                busnissTicketList = await this.businessTicketService.getBusinessTicketList(businessId, isOnLine, limit, offset);
            }
            if (busnissTicketList && busnissTicketList.length) {
                for (const busnissTicket of busnissTicketList) {
                    orderProduct = {
                        id: busnissTicket.businessPriceId,
                        name: busnissTicket.ticket.product.name,
                        code: busnissTicket.ticket.product.code,
                        price: busnissTicket.businessPrice.actualSalePrice,
                        basicPrice: busnissTicket.ticket.product.basicPrice,
                        validity: moment(busnissTicket.endDate).diff(busnissTicket.startDate, 'days') + 1,
                        businessName: busnissTicket.business.name,
                        crowdkindName: busnissTicket.crowdKind.name,
                        priceName: busnissTicket.price.name,
                        discountSchemeName: busnissTicket.discountScheme.name
                    };
                    orderProductList.push(orderProduct);
                }
            }
            return orderProductList;
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async _orderExists(traderNumber) {
        let order = await this.orderRepository.findBySyncId(traderNumber);
        return order ? true : false;
    }
    async _getOrder(orderEntity) {
        try {
            let order = {
                type: orderEntity.type || 0,
                number: '',
                daily: Number(moment().format('YYYYMMDD')),
                monthly: Number(moment().format('YYYYMM')),
                annual: Number(moment().format('YYYY')),
                maker: 1,
                areaId: 1,
                salesWinId: 1,
                businessId: 1,
                touristsAddressId: 0,
                customerId: 0,
                managerId: 0,
                guideId: 0,
                channelId: 0,
                owner: '',
                idCard: '',
                phone: '',
                qrcode: '',
                qrcodePath: '',
                teamCode: '',
                isCashier: true,
                settlementId: 1,
                auditor: '',
                auditTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                startDate: '',
                endDate: '',
                status: 0,
                memo: '',
                syncId: ''
            };
            order.phone = orderEntity.phone || '';
            order.idCard = orderEntity.idCard || '';
            order.qrcode = orderEntity.qrcode || '';
            if (orderEntity.channelName) {
                const channel = await this.customerService.getChannelWithName(orderEntity.channelName);
                if (channel) {
                    order.channelId = channel.id;
                }
            }
            if (orderEntity.customerName) {
                const customer = await this.customerService.getCustomerWithName(orderEntity.customerName);
                if (customer) {
                    order.customerId = customer.id;
                }
            }
            if (orderEntity.guideName) {
                const guide = await this.customerService.getGuideWithName(orderEntity.guideName);
                if (guide) {
                    order.guideId = guide.id;
                }
                order.owner = orderEntity.guideName;
            }
            else if (orderEntity.contactName) {
                order.owner = orderEntity.contactName;
            }
            if (orderEntity.address) {
                const touristsAddress = await this.customerService.getTouristsAddressWithName(orderEntity.address);
                if (touristsAddress) {
                    order.touristsAddressId = touristsAddress.id;
                }
            }
            if (orderEntity.settlementId) {
                order.settlementId = orderEntity.settlementId;
            }
            order.isCashier = orderEntity.isPay;
            if (orderEntity.startDate && orderEntity.endDate) {
                orderEntity.startDate = order.startDate = moment(orderEntity.startDate).format('YYYY-MM-DD HH:mm:ss');
                orderEntity.endDate = order.endDate = moment(orderEntity.endDate).format('YYYY-MM-DD HH:mm:ss');
            }
            else {
                orderEntity.startDate = order.startDate = moment().format('YYYY-MM-DD HH:mm:ss');
                if (orderEntity.useEndDate && moment().isBefore(orderEntity.useEndDate)) {
                    orderEntity.endDate = order.endDate = moment(orderEntity.useEndDate).format('YYYY-MM-DD HH:mm:ss');
                }
                else {
                    orderEntity.endDate = order.endDate = moment().format('YYYY-MM-DD 23:59:59');
                }
            }
            if (orderEntity.traderNumber) {
                order.syncId = orderEntity.traderNumber;
            }
            order.number = await this.orderRepository.generateSerialNumber(order.type, order.salesWinId, order.maker);
            if (!orderEntity.personList || !orderEntity.personList.length) {
                orderEntity.personList = [];
                orderEntity.personList.push({
                    name: order.owner,
                    idCard: order.idCard,
                    phone: order.phone,
                    qrcode: order.qrcode
                });
            }
            return order;
        }
        catch (error) {
            throw error;
        }
    }
    async _getRefundOrderLogs(refundOrderNumber) {
        try {
            return this.orderLogRepository.findRefundOrderLogs(refundOrderNumber);
        }
        catch (error) {
            throw error;
        }
    }
    async queryOrder(traderNumber, orderNumber) {
        try {
            if (!traderNumber && !orderNumber) {
                throw errors.ORDER_ERRORS.notTraderNumber;
            }
            let order = null;
            if (traderNumber) {
                order = await this.orderRepository.findBySyncId(traderNumber);
            }
            if (!order && orderNumber) {
                order = await this.orderRepository.findByNumber(orderNumber);
            }
            if (order) {
                const orderDetailList = await this.orderDetailService.getOrderDetailListWithOrderId(order.id);
                const orderDetail = orderDetailList[0];
                const orderDetailTicket = await this.orderDetailService.getOrderDetailTicket(orderDetail.id);
                const orderDetailChange = await this.orderDetailService.getOrderDetailChange(orderDetail.id);
                const businessTicketEntity = await this.businessTicketService
                    .getBusinessTicketWithBusinessProductId(order.businessId, orderDetail.productId, 2, orderDetail.crowdKindId, orderDetail.priceId);
                let channelName, customerName, guideName;
                if (order.channelId) {
                    const channel = await this.customerService.getChannel(order.channelId);
                    if (channel) {
                        channelName = channel.name;
                    }
                }
                if (order.customerId) {
                    const customer = await this.customerService.getCustomer(order.customerId);
                    if (customer) {
                        customerName = customer.name;
                    }
                }
                if (order.guideId) {
                    const guide = await this.customerService.getGuide(order.guideId);
                    if (guide) {
                        guideName = guide.name;
                    }
                }
                const cancelQuantity = await this.orderLogRepository.findCancelQuantity(order.id);
                const orderQueryEntity = {
                    id: order.id,
                    orderNumber: order.number,
                    traderNumber: order.syncId,
                    productId: businessTicketEntity.businessPrice.id.toString(),
                    productName: businessTicketEntity.ticket.product.name,
                    crowdKindName: businessTicketEntity.crowdKind.name,
                    priceName: businessTicketEntity.price.name,
                    quantity: orderDetailChange.orderQuantity,
                    useQuantity: orderDetailChange.realQuantity || 0,
                    cancelQuantity: cancelQuantity || 0,
                    price: orderDetail.price,
                    amount: orderDetail.amount,
                    qrcode: order.qrcode,
                    idCard: order.idCard,
                    phone: order.phone,
                    contactName: order.owner,
                    channelName: channelName,
                    customerName: customerName,
                    guideName: guideName,
                    startDate: moment(order.startDate).format('YYYY-MM-DD HH:mm:ss'),
                    endDate: moment(order.endDate).format('YYYY-MM-DD HH:mm:ss'),
                    useStartDate: moment(orderDetailTicket.startDate).format('YYYY-MM-DD HH:mm:ss'),
                    useEndDate: moment(orderDetailTicket.endDate).format('YYYY-MM-DD HH:mm:ss'),
                    status: order.status
                };
                orderQueryEntity.personList = [];
                const orderDetailPersonList = await this.orderDetailService.getOrderDetailPersonList(orderDetail.id);
                if (orderDetailPersonList && orderDetailPersonList.length) {
                    orderDetailPersonList.forEach((o) => {
                        orderQueryEntity.personList.push({
                            name: o.name,
                            idCard: o.idCard,
                            phone: o.phone
                        });
                    });
                }
                const ticketData = await this.orderTakeTicketService.getOrderTicketNos(order.id);
                if (ticketData) {
                    orderQueryEntity.ticketNos = ticketData.ticketNos;
                    orderQueryEntity.ticketNoPics = ticketData.ticketNoPics;
                    orderQueryEntity.useTicketNos = ticketData.useTicketNos;
                    orderQueryEntity.usedTicketNos = ticketData.usedTicketNos;
                    orderQueryEntity.refundTicketNos = ticketData.refundTicketNos;
                    if (orderQueryEntity.refundTicketNos && orderQueryEntity.refundTicketNos.length) {
                        orderQueryEntity.cancelQuantity = orderQueryEntity.refundTicketNos.split(',').length;
                        orderQueryEntity.status = 1;
                    }
                    if (order_config_1.default.verifyMode === OrderEntity_1.OrderVerifyMode.检票核销) {
                        orderQueryEntity.useQuantity = orderQueryEntity.usedTicketNos ? orderQueryEntity.usedTicketNos.split(',').length : 0;
                        if (orderQueryEntity.useQuantity) {
                            orderQueryEntity.status = 3;
                        }
                    }
                }
                orderQueryEntity.orderDetail = orderDetail;
                orderQueryEntity.businessTicketEntity = businessTicketEntity;
                return orderQueryEntity;
            }
            else {
                return null;
            }
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    _checkOrder(orderEntity) {
        if (!orderEntity.traderNumber) {
            throw errors.ORDER_ERRORS.notTraderNumber;
        }
        if (!orderEntity.productId) {
            throw errors.ORDER_ERRORS.notProductId;
        }
        if (!orderEntity.quantity) {
            throw errors.ORDER_ERRORS.notQuantity;
        }
        if (!orderEntity.channelName) {
            throw errors.ORDER_ERRORS.notChannelName;
        }
        return true;
    }
    _checkTouristOrder(orderEntity, businessTicketEntity) {
        if (this._checkOrder(orderEntity)) {
            if (businessTicketEntity.businessId !== 3) {
                throw errors.ORDER_ERRORS.notProductWithTourist;
            }
            return true;
        }
    }
    _checkTeamOrder(orderEntity, businessTicketEntity) {
        if (this._checkOrder(orderEntity)) {
            if (!orderEntity.customerName) {
                throw errors.ORDER_ERRORS.notCustomerName;
            }
            if (!orderEntity.guideName) {
                throw errors.ORDER_ERRORS.notGuideName;
            }
            if (businessTicketEntity.businessId !== 2) {
                throw errors.ORDER_ERRORS.notProductWithTeam;
            }
            return true;
        }
    }
    async addTouristOrder(orderEntity) {
        try {
            const businessTicketEntity = await this.businessTicketService.getBusinessTicketWithBusinessPriceId(orderEntity.productId);
            if (businessTicketEntity) {
                if (this._checkTouristOrder(orderEntity, businessTicketEntity)) {
                    return await this.addOrder(orderEntity, businessTicketEntity);
                }
            }
            else {
                throw errors.ORDER_ERRORS.notProduct;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async addTeamOrder(orderEntity) {
        try {
            const businessTicketEntity = await this.businessTicketService.getBusinessTicketWithBusinessPriceId(orderEntity.productId);
            if (businessTicketEntity) {
                if (this._checkTeamOrder(orderEntity, businessTicketEntity)) {
                    return await this.addOrder(orderEntity, businessTicketEntity);
                }
            }
            else {
                throw errors.ORDER_ERRORS.notProduct;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async addOrder(orderEntity, businessTicketEntity) {
        try {
            if (await this._orderExists(orderEntity.traderNumber)) {
                throw errors.ORDER_ERRORS.orderExisted;
            }
            await models_1.db.beginTransaction();
            let order = await this._getOrder(orderEntity);
            order.businessId = businessTicketEntity.businessId;
            order = await this.orderRepository.createOrder(order);
            orderEntity.orderId = order.id;
            orderEntity.orderNumber = order.number;
            if (!orderEntity.useStartDate || !orderEntity.useEndDate) {
                orderEntity.useStartDate = businessTicketEntity.startDate;
                orderEntity.useEndDate = businessTicketEntity.endDate;
            }
            else {
                businessTicketEntity.startDate = orderEntity.useStartDate;
                businessTicketEntity.endDate = orderEntity.useEndDate;
            }
            let orderDetail = await this.orderDetailService.addOrderDetail(orderEntity, businessTicketEntity);
            const orderLog = {
                orderId: order.id,
                areaId: order.areaId,
                number: order.number,
                quantity: orderEntity.quantity,
                status: 0,
                isSync: 0
            };
            await this.orderLogRepository.createOrderLog(orderLog);
            orderEntity.verifyMode = order_config_1.default.verifyMode;
            if (orderEntity.type === 2 && order_config_1.default.verifyMode === OrderEntity_1.OrderVerifyMode.检票核销) {
                try {
                    const ticketData = await this.orderTakeTicketService.takeOrder(order, orderEntity, { id: orderDetail.id, businessTicketEntity });
                    if (ticketData) {
                        orderEntity.ticketNos = ticketData.ticketNos;
                        orderEntity.ticketNoPics = ticketData.ticketNoPics;
                    }
                }
                catch (error) {
                    throw errors.ORDER_ERRORS.orderAchieveTicketFail;
                }
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
    async updateOrder(orderEntity) {
        try {
            if (!orderEntity.traderNumber) {
                throw errors.ORDER_ERRORS.notTraderNumber;
            }
            const order = await this.orderRepository.findBySyncId(orderEntity.traderNumber);
            if (order) {
                if (order.status > 0) {
                    throw errors.ORDER_ERRORS.orderUsed;
                }
                await models_1.db.beginTransaction();
                if (orderEntity.qrcode) {
                    order.qrcode = orderEntity.qrcode;
                }
                if (orderEntity.idCard) {
                    order.idCard = orderEntity.idCard;
                }
                if (orderEntity.phone) {
                    order.phone = orderEntity.phone;
                }
                if (orderEntity.contactName) {
                    order.owner = orderEntity.contactName;
                }
                if (orderEntity.guideName) {
                    if (orderEntity.guideName) {
                        const guide = await this.customerService.getGuideWithName(orderEntity.guideName);
                        if (guide) {
                            order.guideId = guide.id;
                        }
                        order.owner = orderEntity.guideName;
                    }
                    else if (orderEntity.contactName) {
                        order.owner = orderEntity.contactName;
                    }
                }
                if (orderEntity.useStartDate || orderEntity.useStartDate) {
                    const orderDetailList = await this.orderDetailService.getOrderDetailListWithOrderId(order.id);
                    const orderDetail = orderDetailList[0];
                    const orderDetailTicket = await this.orderDetailService.getOrderDetailTicket(orderDetail.id);
                    if (orderEntity.useStartDate) {
                        orderDetailTicket.startDate = moment(orderEntity.useStartDate).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (orderEntity.useEndDate) {
                        orderDetailTicket.endDate = moment(orderEntity.useEndDate).format('YYYY-MM-DD HH:mm:ss');
                    }
                    const result = await this.orderDetailService.updateOrderDetailTicket(orderDetailTicket);
                    if (!result) {
                        throw errors.ORDER_ERRORS.useDateModifyFail;
                    }
                }
                const result = await this.orderRepository.updateOrder(order);
                if (!result) {
                    throw errors.ORDER_ERRORS.orderInfoModifyFail;
                }
                await models_1.db.commitTransaction();
                return this.queryOrder(orderEntity.traderNumber);
            }
            else {
                throw errors.ORDER_ERRORS.orderExisted;
            }
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
    async closeOrder(traderNumber, orderNumber) {
        try {
            if (!traderNumber && !orderNumber) {
                throw errors.ORDER_ERRORS.notTraderNumber;
            }
            let order = null;
            if (traderNumber) {
                order = await this.orderRepository.findBySyncId(traderNumber);
            }
            if (!order && orderNumber) {
                order = await this.orderRepository.findByNumber(orderNumber);
            }
            if (order) {
                if (moment().isAfter(order.endDate)) {
                    throw errors.ORDER_ERRORS.orderExpired;
                }
                if (order.status === 1) {
                    throw errors.ORDER_ERRORS.orderCanceled;
                }
                else if (order.status === -1) {
                    throw errors.ORDER_ERRORS.orderClosed;
                }
                else if (order.status === 2) {
                    throw errors.ORDER_ERRORS.orderUsed;
                }
                else {
                    await this.orderRepository.updateOrderStatus(order.id, -1);
                    return true;
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
    async refundOrder(traderNumber, refundOrderNumber, ticketNos) {
        try {
            if (!traderNumber) {
                throw errors.ORDER_ERRORS.notTraderNumber;
            }
            let cancelQuantity = 0;
            let status = 0;
            let order = null;
            if (traderNumber) {
                order = await this.orderRepository.findBySyncId(traderNumber);
            }
            if (order) {
                if (moment().isAfter(order.endDate)) {
                    throw errors.ORDER_ERRORS.orderExpired;
                }
                if (order.status === 1) {
                    throw errors.ORDER_ERRORS.orderCanceled;
                }
                else if (order.status === -1) {
                    throw errors.ORDER_ERRORS.orderClosed;
                }
                else if (order.status === 2 && order_config_1.default.verifyMode === OrderEntity_1.OrderVerifyMode.出票核销) {
                    throw errors.ORDER_ERRORS.orderUsed;
                }
                else {
                    await models_1.db.beginTransaction();
                    let refundTicketNos;
                    if (order_config_1.default.verifyMode === OrderEntity_1.OrderVerifyMode.检票核销) {
                        try {
                            let orderVoucher = await this.orderVoucherRepository.findOrderVoucher(order.id);
                            if (orderVoucher) {
                                refundTicketNos = await this.refundTicketService.resetSalesTicketData(orderVoucher.voucherId, ticketNos);
                                cancelQuantity = refundTicketNos.length;
                            }
                        }
                        catch (error) {
                            throw errors.ORDER_ERRORS.orderRefundTicketFail;
                        }
                    }
                    else {
                        const orderDetailList = await this.orderDetailService.getOrderDetailListWithOrderId(order.id);
                        orderDetailList.forEach((o) => {
                            cancelQuantity += o.quantity;
                        });
                    }
                    await this.orderLogRepository.createOrderLog({
                        orderId: order.id,
                        areaId: order.areaId,
                        number: order.number,
                        status: 1,
                        quantity: cancelQuantity,
                        memo: refundOrderNumber,
                        isSync: 0
                    });
                    let result = await this.orderRepository.updateOrderStatus(order.id, 1);
                    if (result) {
                        status = 1;
                        if (refundTicketNos && refundTicketNos.length) {
                            cancelQuantity = refundTicketNos.length;
                        }
                    }
                    else {
                        status = 0;
                        cancelQuantity = 0;
                    }
                    await models_1.db.commitTransaction();
                    return { cancelQuantity, status };
                }
            }
            else {
                throw errors.ORDER_ERRORS.orderNoExisted;
            }
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
}
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderRepository_1.OrderRepository)
], OrderService.prototype, "orderRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderLogRepository_1.OrderLogRepository)
], OrderService.prototype, "orderLogRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderVoucherRepository_1.OrderVoucherRepository)
], OrderService.prototype, "orderVoucherRepository", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", BusinessTicketService_1.BusinessTicketService)
], OrderService.prototype, "businessTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", CustomerService_1.CustomerService)
], OrderService.prototype, "customerService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", OrderDetailService_1.OrderDetailService)
], OrderService.prototype, "orderDetailService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", OrderTakeTicketService_1.OrderTakeTicketService)
], OrderService.prototype, "orderTakeTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", RefundTicketService_1.RefundTicketService)
], OrderService.prototype, "refundTicketService", void 0);
exports.OrderService = OrderService;
