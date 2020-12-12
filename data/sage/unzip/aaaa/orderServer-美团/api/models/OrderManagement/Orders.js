"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Orders {
}
exports.Orders = Orders;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Orders', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        number: {
            type: dataTypes.STRING(30)
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
        maker: {
            type: dataTypes.INTEGER
        },
        areaId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesWinId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        channelId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        touristsAddressId: {
            type: dataTypes.INTEGER
        },
        customerId: {
            type: dataTypes.INTEGER
        },
        managerId: {
            type: dataTypes.INTEGER
        },
        guideId: {
            type: dataTypes.INTEGER
        },
        owner: {
            type: dataTypes.STRING(50)
        },
        idCard: {
            type: dataTypes.STRING(30)
        },
        phone: {
            type: dataTypes.STRING(30)
        },
        qrcode: {
            type: dataTypes.STRING(255)
        },
        qrcodePath: {
            type: dataTypes.STRING(255)
        },
        teamCode: {
            type: dataTypes.STRING(30)
        },
        settlementId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        settlementTime: {
            type: dataTypes.DATE
        },
        isCashier: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        auditor: {
            type: dataTypes.STRING(20)
        },
        auditTime: {
            type: dataTypes.DATE
        },
        status: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        syncId: {
            type: dataTypes.STRING(30),
            defaultValue: -1
        },
        startDate: {
            type: dataTypes.DATE
        },
        endDate: {
            type: dataTypes.DATE
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    });
}
exports.default = default_1;
