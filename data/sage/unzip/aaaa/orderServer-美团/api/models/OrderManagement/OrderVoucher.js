"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderVoucher {
}
exports.OrderVoucher = OrderVoucher;
function default_1(sequelize, dataTypes) {
    return sequelize.define('OrderVoucher', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: dataTypes.INTEGER
        },
        voucherId: {
            type: dataTypes.INTEGER
        }
    });
}
exports.default = default_1;
