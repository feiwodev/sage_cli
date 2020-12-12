"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderDetail {
}
exports.OrderDetail = OrderDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('OrderDetail', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderId: {
            type: dataTypes.INTEGER
        },
        seqNo: {
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER
        },
        crowdKindId: {
            type: dataTypes.INTEGER
        },
        priceId: {
            type: dataTypes.INTEGER
        },
        discountSchemeId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        discount: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        price: {
            type: dataTypes.FLOAT
        },
        amount: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
