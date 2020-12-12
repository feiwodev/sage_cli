"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherSplitAccount {
}
exports.VoucherSplitAccount = VoucherSplitAccount;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherSplitAccount', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        areaId: {
            type: dataTypes.INTEGER
        },
        voucherDetailId: {
            type: dataTypes.INTEGER
        },
        merchantId: {
            type: dataTypes.INTEGER
        },
        businessId: {
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER
        },
        settlementId: {
            type: dataTypes.INTEGER
        },
        splitAmount: {
            type: dataTypes.FLOAT
        },
        splitQuantity: {
            type: dataTypes.INTEGER
        },
        reservedAmount: {
            type: dataTypes.FLOAT
        },
        auditor: {
            type: dataTypes.INTEGER
        },
        auditTime: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
