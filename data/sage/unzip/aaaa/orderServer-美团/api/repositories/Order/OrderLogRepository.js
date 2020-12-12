"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const DbContext_1 = require("../utils/DbContext");
class OrderLogRepository extends DbContext_1.DbContext {
    constructor(transaction) {
        super(models_1.models.OrderLog, transaction);
    }
    async findCancelQuantity(orderId) {
        try {
            return await this.sum('quantity', { orderId, status: 1 });
        }
        catch (error) {
            throw error;
        }
    }
    async findUnSyncOrderLogs(type = 0, status, channelName) {
        try {
            if (!models_1.models.OrderLog.associations.order) {
                models_1.models.OrderLog.belongsTo(models_1.models.Orders, { foreignKey: 'orderId', targetKey: 'id', as: 'order', constraints: false });
            }
            if (channelName) {
                if (!models_1.models.Orders.associations.channel) {
                    models_1.models.Orders.belongsTo(models_1.models.Channel, { foreignKey: 'channelId', targetKey: 'id', as: 'channel', constraints: false });
                }
                return await this.find({ isSync: 0, status: (status || [1, 2, 3]) }, {
                    include: [{
                            model: models_1.models.Orders,
                            as: 'order',
                            where: {
                                type
                            },
                            include: [{
                                    model: models_1.models.Channel,
                                    as: 'channel',
                                    where: {
                                        name: channelName
                                    }
                                }]
                        }]
                });
            }
            else {
                return await this.find({ isSync: 0, status: (status || [1, 2, 3]) }, {
                    include: [{
                            model: models_1.models.Orders,
                            as: 'order',
                            where: {
                                type
                            }
                        }]
                });
            }
        }
        catch (error) {
            throw error;
        }
    }
    async findRefundOrderLogs(refundOrderNumber) {
        try {
            return await this.find({ memo: refundOrderNumber, status: 1 });
        }
        catch (error) {
            throw error;
        }
    }
    async createOrderLog(orderLog) {
        try {
            return await this.create(orderLog);
        }
        catch (error) {
            throw error;
        }
    }
    async updateOrderLog(orderLog) {
        try {
            return await this.update(orderLog);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OrderLogRepository = OrderLogRepository;
