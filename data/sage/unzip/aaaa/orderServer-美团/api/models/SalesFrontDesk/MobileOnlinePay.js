"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MobileOnlinePay {
}
exports.MobileOnlinePay = MobileOnlinePay;
function default_1(sequelize, dataTypes) {
    return sequelize.define('MobileOnlinePay', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        voucherNumber: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        subject: {
            type: dataTypes.STRING(512),
            allowNull: true
        },
        paymentAmount: {
            type: dataTypes.FLOAT
        },
        body: {
            type: dataTypes.STRING(512),
            allowNull: true
        },
        paymentType: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        returnUrl: {
            type: dataTypes.STRING(512),
            allowNull: true
        },
        ip: {
            type: dataTypes.STRING(512),
            allowNull: true
        },
        mac: {
            type: dataTypes.STRING(512),
            allowNull: true
        },
        status: {
            type: dataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
