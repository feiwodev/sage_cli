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
const router_1 = require("../../lib/router");
const controller_1 = require("../../lib/controller");
const service_1 = require("../../lib/service");
const MeituanAPI_1 = require("../services/MeituanOrder/MeituanAPI");
const MeituanService_1 = require("../services/MeituanOrder/MeituanService");
const MeituanNotityService_1 = require("../services/MeituanOrder/MeituanNotityService");
const config_1 = require("../../config/config");
class MeituanController extends controller_1.Controller {
    async queryProductPrice() {
        const orderCreateRequest = this.ctx.request.body;
        const orderCreateResponse = {
            code: 200,
            describe: 'success',
            partnerId: orderCreateRequest.partnerId
        };
        try {
            if (!this.meituanService.checkSign(this.ctx.request)) {
                orderCreateResponse.code = 410;
                orderCreateResponse.describe = '签名核验失败';
            }
            else {
                if (!orderCreateRequest.body
                    || !orderCreateRequest.body.partnerDealId
                    || !orderCreateRequest.body.startTime
                    || !orderCreateRequest.body.endTime) {
                    orderCreateResponse.code = 201;
                    orderCreateResponse.describe = '参数错误';
                }
                else {
                    let result = await this.meituanService.queryProductPrice(orderCreateRequest.body);
                    if (result) {
                        orderCreateResponse.body = result;
                    }
                    else {
                        orderCreateResponse.code = 299;
                        orderCreateResponse.describe = '获取产品价格失败';
                    }
                }
            }
        }
        catch (error) {
            orderCreateResponse.code = 299;
            orderCreateResponse.describe = error.message || error;
        }
        this.ctx.body = orderCreateResponse;
    }
    async createOrder() {
        const orderCreateRequest = this.ctx.request.body;
        const orderCreateResponse = {
            code: 200,
            describe: 'success',
            partnerId: orderCreateRequest.partnerId
        };
        try {
            if (!this.meituanService.checkSign(this.ctx.request)) {
                orderCreateResponse.code = 410;
                orderCreateResponse.describe = '签名核验失败';
            }
            else {
                let result = await this.meituanService.createOrder(orderCreateRequest.body);
                if (result) {
                    orderCreateResponse.body = {
                        partnerOrderId: result.orderNumber
                    };
                }
                else {
                    orderCreateResponse.code = 499;
                    orderCreateResponse.describe = '订单创建失败';
                }
            }
        }
        catch (error) {
            orderCreateResponse.code = 499;
            orderCreateResponse.describe = error.message || error;
        }
        this.meituanNotityService.start();
        this.ctx.body = orderCreateResponse;
    }
    async closeOrder() {
        const orderCreateRequest = this.ctx.request.body;
        const orderCreateResponse = {
            code: 200,
            describe: 'success',
            partnerId: orderCreateRequest.partnerId
        };
        try {
            if (!this.meituanService.checkSign(this.ctx.request)) {
                orderCreateResponse.code = 300;
                orderCreateResponse.describe = '签名核验失败';
            }
            else {
                let result = await this.meituanService.closeOrder(orderCreateRequest.body);
                if (!result) {
                    orderCreateResponse.code = 300;
                    orderCreateResponse.describe = '订单关闭失败';
                }
            }
        }
        catch (error) {
            orderCreateResponse.code = 300;
            orderCreateResponse.describe = error.message || error;
        }
        this.ctx.body = orderCreateResponse;
    }
    async refundOrder() {
        const orderCreateRequest = this.ctx.request.body;
        const orderCreateResponse = {
            code: 200,
            describe: 'success',
            partnerId: orderCreateRequest.partnerId
        };
        try {
            if (!this.meituanService.checkSign(this.ctx.request)) {
                orderCreateResponse.code = 699;
                orderCreateResponse.describe = '签名核验失败';
            }
            else {
                let result = await this.meituanService.refundOrder(orderCreateRequest.body);
                if (!result) {
                    orderCreateResponse.code = 699;
                    orderCreateResponse.describe = '退款失败';
                }
                else if (result === 1) {
                    orderCreateResponse.body = {
                        orderId: orderCreateRequest.body.orderId,
                        refundId: orderCreateRequest.body.refundId,
                        partnerOrderId: orderCreateRequest.body.partnerOrderId
                    };
                }
                else if (result === 2) {
                    orderCreateResponse.code = 601;
                    orderCreateResponse.describe = '已退款';
                }
            }
        }
        catch (error) {
            orderCreateResponse.code = 699;
            orderCreateResponse.describe = error.message || error;
        }
        this.ctx.body = orderCreateResponse;
    }
    async payOrder() {
        const orderCreateRequest = this.ctx.request.body;
        const orderCreateResponse = {
            code: 200,
            describe: 'success',
            partnerId: orderCreateRequest.partnerId
        };
        try {
            if (!this.meituanService.checkSign(this.ctx.request)) {
                orderCreateResponse.code = 599;
                orderCreateResponse.describe = '签名核验失败';
            }
            else {
                let result = await this.meituanService.payOrder(orderCreateRequest.body);
                if (result) {
                    orderCreateResponse.body = {
                        orderId: orderCreateRequest.body.orderId,
                        partnerOrderId: orderCreateRequest.body.partnerOrderId,
                        voucherType: 1,
                        vouchers: []
                    };
                    if (result.ticketNos) {
                        orderCreateResponse.body.vouchers = result.ticketNos.split(',');
                    }
                    if (result.ticketNoPics) {
                        orderCreateResponse.body.voucherPics = result.ticketNoPics.split(',');
                    }
                }
                else {
                    orderCreateResponse.code = 599;
                    orderCreateResponse.describe = '订单出票失败';
                }
            }
        }
        catch (error) {
            orderCreateResponse.code = 599;
            orderCreateResponse.describe = error.message || error;
        }
        this.ctx.body = orderCreateResponse;
    }
    async queryOrder() {
        const orderCreateRequest = this.ctx.request.body;
        const orderCreateResponse = {
            code: 200,
            describe: 'success',
            partnerId: orderCreateRequest.partnerId
        };
        try {
            if (!this.meituanService.checkSign(this.ctx.request)) {
                orderCreateResponse.code = 599;
                orderCreateResponse.describe = '签名核验失败';
            }
            else {
                let result = await this.meituanService.queryOrder(orderCreateRequest.body);
                if (result) {
                    orderCreateResponse.body = {
                        orderId: orderCreateRequest.body.orderId,
                        partnerOrderId: orderCreateRequest.body.partnerOrderId,
                        voucherType: 1,
                        voucherList: []
                    };
                    orderCreateResponse.body.orderQuantity = result.quantity;
                    orderCreateResponse.body.usedQuantity = result.useQuantity;
                    orderCreateResponse.body.refundedQuantity = result.cancelQuantity;
                    if (result.status === 0 || result.status === -1) {
                        orderCreateResponse.body.orderStatus = 2;
                    }
                    else {
                        orderCreateResponse.body.orderStatus = 4;
                        if (result.useTicketNos) {
                            const ticketNos = result.useTicketNos.split(',');
                            for (const ticketNo of ticketNos) {
                                orderCreateResponse.body.voucherList.push({
                                    voucher: ticketNo,
                                    voucherPics: (config_1.config.http.hostName.indexOf('http://') >= 0 ? config_1.config.http.hostName : 'http://' + config_1.config.http.hostName) + '/assets/images/qrcode/' + ticketNo + '.png',
                                    voucherInvalidTime: result.startDate,
                                    quantity: 1,
                                    status: 0
                                });
                            }
                        }
                        if (result.usedTicketNos) {
                            const ticketNos = result.usedTicketNos.split(',');
                            for (const ticketNo of ticketNos) {
                                orderCreateResponse.body.voucherList.push({
                                    voucher: ticketNo,
                                    voucherPics: (config_1.config.http.hostName.indexOf('http://') >= 0 ? config_1.config.http.hostName : 'http://' + config_1.config.http.hostName) + '/assets/images/qrcode/' + ticketNo + '.png',
                                    voucherInvalidTime: result.startDate,
                                    quantity: 1,
                                    status: 1
                                });
                            }
                        }
                        if (result.refundTicketNos) {
                            const ticketNos = result.refundTicketNos.split(',');
                            for (const ticketNo of ticketNos) {
                                orderCreateResponse.body.voucherList.push({
                                    voucher: ticketNo,
                                    voucherPics: (config_1.config.http.hostName.indexOf('http://') >= 0 ? config_1.config.http.hostName : 'http://' + config_1.config.http.hostName) + '/assets/images/qrcode/' + ticketNo + '.png',
                                    voucherInvalidTime: result.startDate,
                                    quantity: 1,
                                    status: 2
                                });
                            }
                        }
                    }
                }
                else {
                    orderCreateResponse.code = 302;
                    orderCreateResponse.describe = '订单查询失败';
                }
            }
        }
        catch (error) {
            orderCreateResponse.code = 399;
            orderCreateResponse.describe = error.message || error;
        }
        this.ctx.body = orderCreateResponse;
    }
}
__decorate([
    service_1.Service(),
    __metadata("design:type", MeituanService_1.MeituanService)
], MeituanController.prototype, "meituanService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", MeituanAPI_1.MeituanAPI)
], MeituanController.prototype, "meituanAPI", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", MeituanNotityService_1.MeituanNotityService)
], MeituanController.prototype, "meituanNotityService", void 0);
__decorate([
    router_1.route('/meituan/product/price/query', router_1.HttpMethod.POST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MeituanController.prototype, "queryProductPrice", null);
__decorate([
    router_1.route('/meituan/order/create', router_1.HttpMethod.POST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MeituanController.prototype, "createOrder", null);
__decorate([
    router_1.route('/meituan/order/close', router_1.HttpMethod.POST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MeituanController.prototype, "closeOrder", null);
__decorate([
    router_1.route('/meituan/order/refund', router_1.HttpMethod.POST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MeituanController.prototype, "refundOrder", null);
__decorate([
    router_1.route('/meituan/order/pay', router_1.HttpMethod.POST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MeituanController.prototype, "payOrder", null);
__decorate([
    router_1.route('/meituan/order/query', router_1.HttpMethod.POST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MeituanController.prototype, "queryOrder", null);
exports.default = MeituanController;
