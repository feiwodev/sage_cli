"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplitBillDetail {
}
exports.SplitBillDetail = SplitBillDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SplitBillDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        splitBillId: {
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.FLOAT
        },
        reservedAmount: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
