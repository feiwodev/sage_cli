"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderDetailChange {
}
exports.OrderDetailChange = OrderDetailChange;
function default_1(sequelize, dataTypes) {
    return sequelize.define('OrderDetailChange', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderDetailId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        seqNo: {
            type: dataTypes.INTEGER
        },
        orderQuantity: {
            type: dataTypes.INTEGER
        },
        realQuantity: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
