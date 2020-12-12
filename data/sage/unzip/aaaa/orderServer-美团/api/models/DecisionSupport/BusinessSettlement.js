"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessSettlement {
}
exports.BusinessSettlement = BusinessSettlement;
function default_1(sequelize, dataTypes) {
    return sequelize.define('BusinessSettlement', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        settlementId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        isIntegral: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        printInvoice: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        splitWay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isReturn: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
