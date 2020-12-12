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
const service_1 = require("../../../lib/service");
const VoucherEntity_1 = require("../../entities/Voucher/VoucherEntity");
const VoucherService_1 = require("../Ticket/Voucher/VoucherService");
const VoucherDetailService_1 = require("../Ticket/Voucher/VoucherDetailService");
const SoldTicketService_1 = require("../Ticket/SoldTicket/SoldTicketService");
const CheckTicketLogService_1 = require("../Access/CheckTicketLogService");
const SalesStatisticsService_1 = require("../Ticket/SalesStatisticsService");
const PrintTicketService_1 = require("../Ticket/PrintTicketService");
const repositories_2 = require("../../repositories");
const OrderVoucherRepository_1 = require("../../repositories/Order/OrderVoucherRepository");
const OrderLogRepository_1 = require("../../repositories/Order/OrderLogRepository");
const OrderDetailChangeRepository_1 = require("../../repositories/Order/OrderDetailChangeRepository");
const SoldRefundVoucherRepository_1 = require("../../repositories/Voucher/SoldRefundVoucherRepository");
const _ = require("lodash");
class OrderTakeTicketService {
    constructor() {
    }
    _getVoucher(order, orderEntity, orderDetailEntity) {
        let voucher = {
            type: VoucherEntity_1.VoucherType.出售,
            areaId: order.areaId,
            salesWinId: order.salesWinId,
            businessId: orderDetailEntity.businessTicketEntity.businessId,
            touristsAddressId: order.touristsAddressId,
            channelId: order.channelId,
            customerId: order.customerId,
            managerId: order.managerId,
            guideId: order.guideId,
            settlementId: order.settlementId,
            total: orderEntity.quantity,
            maker: order.maker,
            handler: order.maker,
            payeer: order.maker,
            auditor: order.maker,
            memo: '系统订单取票'
        };
        voucher.receivable = voucher.paid = Number(orderDetailEntity.businessTicketEntity.businessPrice.actualSalePrice * orderEntity.quantity);
        voucher.change = 0;
        return voucher;
    }
    async _getVoucherDetail(order, orderEntity, orderDetailEntity) {
        let startId = await this.printTicketService.getPrintTicketNo(orderDetailEntity.businessTicketEntity.ticket.productId, order.salesWinId);
        let endId = startId + Number(orderEntity.quantity) - 1;
        let serialPrefix = orderDetailEntity.businessTicketEntity.ticket.product.numberRule.rulesPrefix
            + orderDetailEntity.businessTicketEntity.ticket.product.code
            + _.padStart(order.salesWinId.toString(), 3, '0');
        let serialNoLength = orderDetailEntity.businessTicketEntity.ticket.product.numberRule.serialNoLen;
        let voucherDetailEntity = {
            businessTicket: orderDetailEntity.businessTicketEntity,
            businessTicketId: orderDetailEntity.businessTicketEntity.id,
            seqNo: 1,
            salesSchemeId: orderDetailEntity.businessTicketEntity.salesSchemeId,
            crowdKindId: orderDetailEntity.businessTicketEntity.crowdKindId,
            priceId: orderDetailEntity.businessTicketEntity.priceId,
            businessPriceId: orderDetailEntity.businessTicketEntity.businessPriceId,
            productId: orderDetailEntity.businessTicketEntity.ticket.productId,
            discountSchemeId: orderDetailEntity.businessTicketEntity.discountSchemeId,
            discount: 0,
            quantity: Number(orderEntity.quantity),
            price: orderEntity.price || orderDetailEntity.businessTicketEntity.businessPrice.actualSalePrice,
            amount: orderEntity.amount || Number(orderDetailEntity.businessTicketEntity.businessPrice.actualSalePrice * Number(orderEntity.quantity)),
            startDate: orderDetailEntity.businessTicketEntity.startDate,
            endDate: orderDetailEntity.businessTicketEntity.endDate,
            startId: startId,
            endId: endId,
            serialPrefix: serialPrefix,
            serialNoLength: serialNoLength,
            startSerial: serialPrefix + _.padStart(startId.toString(), serialNoLength, '0'),
            endSerial: serialPrefix + _.padStart(endId.toString(), serialNoLength, '0'),
            idCardList: []
        };
        if (orderEntity.personList) {
            for (let person of orderEntity.personList) {
                voucherDetailEntity.idCardList.push({
                    name: person.name,
                    idCard: person.idCard,
                    phone: person.phone
                });
            }
        }
        return [voucherDetailEntity];
    }
    async takeOrder(order, orderEntity, orderDetailEntity) {
        try {
            let voucher = this._getVoucher(order, orderEntity, orderDetailEntity);
            let voucherDetailList = await this._getVoucherDetail(order, orderEntity, orderDetailEntity);
            let soldTicketList = [];
            const _voucher = await this.voucherService.addVoucher(voucher);
            voucher.id = _voucher.id;
            voucherDetailList = await this.voucherDetailService.addVoucherDetail(voucher, voucherDetailList);
            soldTicketList = await this.soldTicketService.saveSalesSoldTicket(voucher, voucherDetailList);
            await this.salesStatisticsService.addStatisticsData(_voucher, voucherDetailList);
            await this.orderVoucherRepository.createOrderVoucher({
                orderId: order.id,
                voucherId: voucher.id
            });
            await this.orderLogRepository.createOrderLog({
                orderId: order.id,
                areaId: order.areaId,
                number: order.number,
                quantity: orderEntity.quantity,
                status: 2,
                isSync: 0
            });
            await this.orderDetailChangeRepository.createOrderDetailChange({
                orderDetailId: orderDetailEntity.id,
                seqNo: 1,
                orderQuantity: orderEntity.quantity,
                realQuantity: orderEntity.quantity
            });
            await this.orderRepository.updateOrderStatus(order.id, 2);
            const ticketNos = [];
            const ticketNoPics = [];
            soldTicketList.forEach((o) => {
                ticketNos.push(o.ticketNo);
                ticketNoPics.push(o.qrcodePath);
            });
            return {
                ticketNos: ticketNos.join(),
                ticketNoPics: ticketNoPics.join()
            };
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
    async getOrderTicketNos(orderId) {
        try {
            let ticketNos = [];
            let usedTicketNos = [];
            let useTicketNos = [];
            let refundTicketNos = [];
            const ticketNoPics = [];
            let voucherDetailList;
            let voucherDetailTicket;
            let soldTicketList;
            let checkTicketLogList;
            const orderVoucher = await this.orderVoucherRepository.findOrderVoucher(orderId);
            if (orderVoucher) {
                voucherDetailList = await this.voucherDetailService.getVoucherDetailWithVoucher(orderVoucher.voucherId);
                for (const voucherDetail of voucherDetailList) {
                    voucherDetailTicket = await this.voucherDetailService.getVoucherDetailTicketWithVoucherDetailId(voucherDetail.id);
                    soldTicketList = await this.soldTicketService.getSoldTicketWithVoucherDetailTicketId(voucherDetailTicket.id);
                    if (soldTicketList && soldTicketList.length) {
                        soldTicketList.forEach((o) => {
                            ticketNos.push(o.ticketNo);
                            ticketNoPics.push(o.qrcodePath);
                        });
                    }
                    checkTicketLogList = await this.checkTicketLogService.getCheckTicketLogsWithVDTId(voucherDetailTicket.id);
                    if (checkTicketLogList && checkTicketLogList.length) {
                        checkTicketLogList.forEach((o) => {
                            usedTicketNos.push(o.ticketNo);
                        });
                    }
                }
                const soldRefundVoucherList = await this.soldRefundVoucherRepository.findRefundVoucher(orderVoucher.voucherId);
                for (const soldRefundVoucher of soldRefundVoucherList) {
                    voucherDetailList = await this.voucherDetailService.getVoucherDetailWithVoucher(soldRefundVoucher.refundVoucherId);
                    for (const voucherDetail of voucherDetailList) {
                        voucherDetailTicket = await this.voucherDetailService.getVoucherDetailTicketWithVoucherDetailId(voucherDetail.id);
                        soldTicketList = await this.soldTicketService.getSoldTicketWithVoucherDetailTicketId(voucherDetailTicket.id);
                        if (soldTicketList && soldTicketList.length) {
                            soldTicketList.forEach((o) => {
                                refundTicketNos.push(o.ticketNo);
                            });
                        }
                    }
                }
            }
            if (usedTicketNos && usedTicketNos.length) {
                usedTicketNos = _.uniq(usedTicketNos);
            }
            if (refundTicketNos && refundTicketNos.length) {
                refundTicketNos = _.uniq(refundTicketNos);
            }
            if (ticketNos && ticketNos.length) {
                ticketNos = _.uniq(ticketNos);
                useTicketNos = _.cloneDeep(ticketNos);
                _.remove(useTicketNos, (o) => {
                    if (_.findIndex(usedTicketNos, (u) => { return o === u; }) >= 0) {
                        return true;
                    }
                    if (_.findIndex(refundTicketNos, (r) => { return o === r; }) >= 0) {
                        return true;
                    }
                });
            }
            return {
                ticketNos: ticketNos.join(),
                ticketNoPics: ticketNoPics.join(),
                useTicketNos: useTicketNos.join(),
                usedTicketNos: usedTicketNos.join(),
                refundTicketNos: refundTicketNos.join()
            };
        }
        catch (error) {
            log_1.logger.error(error);
            throw error;
        }
    }
}
__decorate([
    service_1.Service(),
    __metadata("design:type", VoucherService_1.VoucherService)
], OrderTakeTicketService.prototype, "voucherService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", VoucherDetailService_1.VoucherDetailService)
], OrderTakeTicketService.prototype, "voucherDetailService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", SoldTicketService_1.SoldTicketService)
], OrderTakeTicketService.prototype, "soldTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", CheckTicketLogService_1.CheckTicketLogService)
], OrderTakeTicketService.prototype, "checkTicketLogService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", PrintTicketService_1.PrintTicketService)
], OrderTakeTicketService.prototype, "printTicketService", void 0);
__decorate([
    service_1.Service(),
    __metadata("design:type", SalesStatisticsService_1.SalesStatisticsService)
], OrderTakeTicketService.prototype, "salesStatisticsService", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", repositories_2.OrderRepository)
], OrderTakeTicketService.prototype, "orderRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderLogRepository_1.OrderLogRepository)
], OrderTakeTicketService.prototype, "orderLogRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderDetailChangeRepository_1.OrderDetailChangeRepository)
], OrderTakeTicketService.prototype, "orderDetailChangeRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", OrderVoucherRepository_1.OrderVoucherRepository)
], OrderTakeTicketService.prototype, "orderVoucherRepository", void 0);
__decorate([
    repositories_1.Repository(),
    __metadata("design:type", SoldRefundVoucherRepository_1.SoldRefundVoucherRepository)
], OrderTakeTicketService.prototype, "soldRefundVoucherRepository", void 0);
exports.OrderTakeTicketService = OrderTakeTicketService;
