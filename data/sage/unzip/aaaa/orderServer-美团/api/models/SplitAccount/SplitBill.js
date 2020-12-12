"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplitBill {
}
exports.SplitBill = SplitBill;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SplitBill', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: dataTypes.STRING(30)
        },
        merchantId: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.FLOAT
        },
        maker: {
            type: dataTypes.INTEGER
        },
        auditor: {
            type: dataTypes.INTEGER
        },
        auditTime: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        daily: {
            type: dataTypes.INTEGER
        },
        monthly: {
            type: dataTypes.INTEGER
        },
        annual: {
            type: dataTypes.INTEGER
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
