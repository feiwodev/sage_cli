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
const OrderService_1 = require("../Order/OrderService");
const MeituanAPI_1 = require("./MeituanAPI");
const meituan_config_1 = require("../../../config/meituan_config");
const moment = require("moment");
class MeituanNotityService {
    constructor() {
        this.status = 0;
        this.rule = '*/' + Number(meituan_config_1.default.notifyInterval) + ' * * * * *';
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
                    }, Number(meituan_config_1.default.notifyInterval) * 3 * 1000);
                }
            }
        }
    }
    async run() {
        try {
            let status = [3];
            const orderLogs = await this.orderLogRepository.findUnSyncOrderLogs(0, status, '美团');
            if (orderLogs && orderLogs.length > 0) {
                for (let orderLog of orderLogs) {
                    let orderNotify = null;
                    let order = await this.orderRepository.findById(orderLog.orderId);
                    if (orderLog.status === 1) {
                        orderNotify = {
                            code: 200,
                            describe: 'success',
                            partnerId: meituan_config_1.default.partnerId,
                            body: {
                                orderId: order.syncId,
                                refundId: orderLog.memo,
                                partnerOrderId: order.number,
                                requestTime: moment(orderLog.createdAt).format('YYYY-MM-DD HH:mm:ss')
                            },
                            notifyUrl: meituan_config_1.default.refundNotifyUrl
                        };
                    }
                    else if (orderLog.status === 2) {
                        let orderEntity = await this.orderService.queryOrder(order.syncId);
                        if (orderEntity) {
                            orderNotify = {
                                code: 200,
                                describe: 'success',
                                partnerId: meituan_config_1.default.partnerId,
                                issueType: 1,
                                body: {
                                    orderId: order.syncId,
                                    partnerOrderId: order.number,
                                    voucherType: 1,
                                    asyReturnVoucher: false,
                                    requestTime: moment(orderLog.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                                    vouchers: [],
                                    voucherPics: []
                                },
                                notifyUrl: meituan_config_1.default.payNotifyUrl
                            };
                            if (orderEntity.ticketNos) {
                                orderNotify.body.vouchers = orderEntity.ticketNos.split(',');
                            }
                            if (orderEntity.ticketNoPics) {
                                orderNotify.body.voucherPics = orderEntity.ticketNoPics.split(',');
                            }
                        }
                    }
                    else if (orderLog.status === 3) {
                        let ticketNos = orderLog.memo.split(',');
                        let orderEntity = await this.orderService.queryOrder(order.syncId);
                        if (orderEntity && ticketNos && ticketNos.length >= 3) {
                            const usedTicketNos = orderEntity.usedTicketNos.split(',');
                            orderNotify = {
                                code: 200,
                                describe: 'success',
                                partnerId: meituan_config_1.default.partnerId,
                                body: {
                                    orderId: order.syncId,
                                    partnerOrderId: order.number,
                                    quantity: orderEntity.quantity,
                                    refundedQuantity: orderEntity.cancelQuantity,
                                    usedQuantity: usedTicketNos.length,
                                    voucherList: []
                                },
                                notifyUrl: meituan_config_1.default.consumeNotifyUrl
                            };
                            orderNotify.body.voucherList = [{
                                    voucher: ticketNos[2],
                                    voucherInvalidTime: moment(orderLog.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                                    quantity: 1,
                                    status: 1
                                }];
                        }
                    }
                    console.log('orderNotify --> ', JSON.stringify(orderNotify));
                    if (orderNotify && await this.notity(orderNotify)) {
                        console.log('update order log ..............');
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
    async notity(orderNotify, count = 0) {
        if (count > 10) {
            this.stop(true);
            return false;
        }
        try {
            console.log('request url -->', orderNotify.notifyUrl);
            console.log('request orderNotify --> ', JSON.stringify(orderNotify));
            const result = await this.meituanAPI.request(orderNotify.notifyUrl, orderNotify);
            console.log('notity result -->', JSON.stringify(result));
            if (result && (result.code === 200 || result.code === 201)) {
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
            return this.notity(orderNotify, count);
        }
    }
}
__decorate([
    service_1.Service(),
    __metadata("design:type", OrderService_1.OrderService)
], MeituanNotityService.prototype, "orderService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", MeituanAPI_1.MeituanAPI)
], MeituanNotityService.prototype, "meituanAPI", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderRepository_1.OrderRepository)
], MeituanNotityService.prototype, "orderRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderLogRepository_1.OrderLogRepository)
], MeituanNotityService.prototype, "orderLogRepository", void 0);
exports.MeituanNotityService = MeituanNotityService;
