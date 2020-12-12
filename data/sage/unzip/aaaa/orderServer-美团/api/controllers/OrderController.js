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
const errors = require("../../config/errors");
const router_1 = require("../../lib/router");
const controller_1 = require("../../lib/controller");
const service_1 = require("../../lib/service");
const OrderService_1 = require("../services/Order/OrderService");
const OrderNotityService_1 = require("../services/Order/OrderNotityService");
const MD5_1 = require("../utils/MD5");
const config = require("../../config/config");
const order_config_1 = require("../../config/order_config");
const _ = require("lodash");
class OrderController extends controller_1.Controller {
    checkParams(requestBody) {
        let methods = ['queryProduct', 'createOrder', 'createTeamOrder', 'cancelOrder', 'queryOrder', 'updateOrder', 'updateTeamOrder'];
        if (!requestBody.method) {
            throw new Error('缺少method参数');
        }
        else if (_.findIndex(methods, (o) => { return o === requestBody.method; }) < 0) {
            throw new Error('参数method值不正确');
        }
        if (!requestBody.sign) {
            throw new Error('缺少sign参数');
        }
        return true;
    }
    checkSign(requestBody) {
        try {
            const content = _.cloneDeep(requestBody);
            delete content.sign;
            const validateData = {};
            Object.keys(content).sort().map((key) => {
                validateData[key] = content[key];
            });
            const signStr = MD5_1.default(JSON.stringify(validateData) + order_config_1.default.secret);
            if (signStr !== requestBody.sign) {
                if (!config.isProd) {
                    throw new Error('无效的签名，参数签名字符串:' + signStr);
                }
                else {
                    throw errors.ORDER_ERRORS.invalidSign;
                }
            }
            return true;
        }
        catch (error) {
            throw error || '参数验证签名失败';
        }
    }
    async orderHandler() {
        try {
            const body = this.ctx.request.body;
            let order = null;
            let result = null;
            if (this.checkParams(body) && this.checkSign(body)) {
                switch (body.method) {
                    case 'queryProduct':
                        const id = this.ctx.request.body.id || '';
                        const categoryId = this.ctx.request.body.categoryId || 3;
                        const type = this.ctx.request.body.type || 0;
                        const page = this.ctx.request.body.page || 1;
                        const size = this.ctx.request.body.size || 100;
                        result = await this.orderService.getOrderProductList(id, categoryId, type, (page - 1) * size, size);
                        break;
                    case 'createOrder':
                        body.type = body.type || 2;
                        order = await this.orderService.addTouristOrder(body);
                        result = {
                            orderNumber: order.orderNumber,
                            traderNumber: order.traderNumber,
                            ticketNos: order.ticketNos,
                            ticketNoPics: order.ticketNoPics,
                            verifyMode: order.verifyMode
                        };
                        break;
                    case 'createTeamOrder':
                        body.type = body.type || 2;
                        order = await this.orderService.addTeamOrder(body);
                        result = {
                            orderNumber: order.orderNumber,
                            traderNumber: order.traderNumber,
                            ticketNos: order.ticketNos,
                            ticketNoPics: order.ticketNoPics,
                            verifyMode: order.verifyMode
                        };
                        break;
                    case 'cancelOrder':
                        result = await this.orderService.refundOrder(body.traderNumber, body.orderNumber);
                        break;
                    case 'queryOrder':
                        result = await this.orderService.queryOrder(body.traderNumber, body.orderNumber);
                        if (result.orderDetail) {
                            delete result.orderDetail;
                        }
                        if (result.businessTicketEntity) {
                            delete result.businessTicketEntity;
                        }
                        break;
                    case 'updateOrder':
                    case 'updateTeamOrder':
                        result = await this.orderService.updateOrder(body);
                        break;
                }
            }
            this.orderNotityService.start();
            this.ctx.status = 200;
            this.ctx.body = {
                data: result,
                error: {
                    code: 0,
                    message: 'success'
                }
            };
        }
        catch (error) {
            this.ctx.status = 200;
            this.ctx.body = {
                data: null,
                error: {
                    code: error.code || error.status || 500,
                    message: error.message || error
                }
            };
        }
    }
}
__decorate([
    service_1.Service(),
    __metadata("design:type", OrderService_1.OrderService)
], OrderController.prototype, "orderService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", OrderNotityService_1.OrderNotityService)
], OrderController.prototype, "orderNotityService", void 0);
__decorate([
    router_1.route('/order', router_1.HttpMethod.POST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderHandler", null);
exports.default = OrderController;
