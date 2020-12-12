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
const schedule = require("node-schedule");
const log_1 = require("../../../middleware/log");
const repositories_1 = require("../../repositories");
const OrderRepository_1 = require("../../repositories/Order/OrderRepository");
const OrderLogRepository_1 = require("../../repositories/Order/OrderLogRepository");
const service_1 = require("../../../lib/service");
const BusinessTicketService_1 = require("../Ticket/BusinessTicket/BusinessTicketService");
const OrderService_1 = require("./OrderService");
const OrderDetailService_1 = require("./OrderDetailService");
const order_config_1 = require("../../../config/order_config");
const MD5_1 = require("../../utils/MD5");
const HttpRequest_1 = require("../../utils/HttpRequest");
const OrderEntity_1 = require("../../entities/Order/OrderEntity");
const moment = require("moment");
class OrderNotityService {
    constructor() {
        this.status = 0;
        this.rule = '*/' + Number(order_config_1.default.notifyInterval) + ' * * * * *';
        this.start();
    }
    start() {
        if (!this.status) {
            this.task = schedule.scheduleJob(this.rule, () => {
                this.run();
                this.status = 1;
            });
        }
        else if (this.status === 2) {
            if (this.task.reschedule(this.rule)) {
                this.status = 1;
            }
        }
    }
    stop(reschedule) {
        if (this.status === 1) {
            if (this.task.cancel()) {
                this.status = 2;
                if (reschedule) {
                    setTimeout(() => {
                        this.start();
                    }, Number(order_config_1.default.notifyInterval) * 3 * 1000);
                }
            }
        }
    }
    async run() {
        try {
            let status;
            if (order_config_1.default.verifyMode === OrderEntity_1.OrderVerifyMode.出票核销) {
                status = [1, 2];
            }
            else if (order_config_1.default.verifyMode === OrderEntity_1.OrderVerifyMode.检票核销) {
                status = [3];
            }
            const orderLogs = await this.orderLogRepository.findUnSyncOrderLogs(2, status);
            if (orderLogs && orderLogs.length > 0) {
                for (let orderLog of orderLogs) {
                    let order = await this.orderRepository.findById(orderLog.orderId);
                    const orderDetailList = await this.orderDetailService.getOrderDetailListWithOrderId(order.id);
                    const orderDetail = orderDetailList[0];
                    const businessTicketEntity = await this.businessTicketService
                        .getBusinessTicketWithBusinessProductId(order.businessId, orderDetail.productId, 2, orderDetail.crowdKindId, orderDetail.priceId, false);
                    const orderDetailPersonList = await this.orderDetailService.getOrderDetailPersonList(orderDetail.id);
                    const personList = [];
                    if (orderDetailPersonList && orderDetailPersonList.length) {
                        orderDetailPersonList.forEach((o, index) => {
                            if (index < orderLog.quantity) {
                                personList.push({
                                    name: o.name,
                                    idCard: o.idCard,
                                    phone: o.phone
                                });
                            }
                        });
                    }
                    const orderNotifyEntity = {
                        orderNumber: order.number,
                        traderNumber: order.syncId,
                        productId: businessTicketEntity.businessPriceId.toString(),
                        quantity: orderLog.quantity,
                        status: orderLog.status,
                        personList: personList,
                        ticketNos: '',
                        timestamp: moment(orderLog.createdAt).format('YYYYMMDDHHmmss') + orderLog.id
                    };
                    if (orderLog.status === 2) {
                        let orderEntity = await this.orderService.queryOrder(order.syncId);
                        if (orderEntity && orderEntity.ticketNos) {
                            orderNotifyEntity.ticketNos = orderEntity.ticketNos;
                        }
                    }
                    else if (orderLog.status === 3) {
                        let ticketNos = orderLog.memo.split(',');
                        if (ticketNos && ticketNos.length === 3) {
                            orderNotifyEntity.ticketNos = ticketNos[2];
                        }
                    }
                    if (await this.notity(orderNotifyEntity)) {
                        orderLog.isSync = 1;
                        this.orderLogRepository.updateOrderLog(orderLog);
                    }
                }
            }
            else {
                this.stop(true);
            }
        }
        catch (error) {
            log_1.logger.error('订单变更通知计划异常');
            log_1.logger.error(error);
            this.stop();
        }
    }
    async notity(orderNotifyEntity, count = 0) {
        if (count > 10) {
            this.stop(true);
            return false;
        }
        const content = Object.assign({}, orderNotifyEntity, { method: 'consumeOrder' });
        const validateData = {};
        Object.keys(content).sort().map((key) => {
            validateData[key] = content[key];
        });
        content.sign = MD5_1.default(JSON.stringify(validateData) + order_config_1.default.secret);
        try {
            const result = await HttpRequest_1.httpPost(order_config_1.default.notifyUrl, content);
            if (result && result.data) {
                return true;
            }
            else {
                log_1.logger.error('订单通知返回结果错误');
                log_1.logger.error(result);
                return false;
            }
        }
        catch (error) {
            log_1.logger.error('订单变更通知异常');
            log_1.logger.error(error);
            count++;
            return this.notity(orderNotifyEntity, count);
        }
    }
}
__decorate([
    service_1.Service(),
    __metadata("design:type", BusinessTicketService_1.BusinessTicketService)
], OrderNotityService.prototype, "businessTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", OrderService_1.OrderService)
], OrderNotityService.prototype, "orderService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", OrderDetailService_1.OrderDetailService)
], OrderNotityService.prototype, "orderDetailService", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderRepository_1.OrderRepository)
], OrderNotityService.prototype, "orderRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderLogRepository_1.OrderLogRepository)
], OrderNotityService.prototype, "orderLogRepository", void 0);
exports.OrderNotityService = OrderNotityService;
