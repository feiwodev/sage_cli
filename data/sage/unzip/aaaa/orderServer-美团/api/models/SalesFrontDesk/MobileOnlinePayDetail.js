"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MobileOnlinePayDetail {
}
exports.MobileOnlinePayDetail = MobileOnlinePayDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('MobileOnlinePayDetail', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        voucherNumber: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        startSerial: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        endSerial: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: dataTypes.FLOAT,
            allowNull: true
        },
        personPreTicket: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        startDate: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        endDate: {
            type: dataTypes.STRING(30),
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
