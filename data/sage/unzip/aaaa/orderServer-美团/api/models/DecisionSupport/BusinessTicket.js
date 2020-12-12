"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessTicket {
}
exports.BusinessTicket = BusinessTicket;
function default_1(sequelize, dataTypes) {
    return sequelize.define('BusinessTicket', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        businessId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        ticketId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        deposit: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        handCharge: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        refundAmount: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        forceRefundAmount: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        isRefundBalance: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        reservedMoney: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        isCashCheck: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        personPreTicket: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        activation: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        activeNum: {
            type: dataTypes.INTEGER
        },
        activeUnits: {
            type: dataTypes.INTEGER,
            defaultValue: 2
        },
        validityNum: {
            type: dataTypes.INTEGER
        },
        validityUnits: {
            type: dataTypes.INTEGER,
            defaultValue: 2
        },
        consumeType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        totalNumber: {
            type: dataTypes.INTEGER
        },
        totalAmount: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        totalMinutes: {
            type: dataTypes.INTEGER
        },
        thumbnail: {
            type: dataTypes.STRING(512)
        },
        ticketIntroduction: {
            type: dataTypes.STRING(1024)
        },
        ticketPicture: {
            type: dataTypes.TEXT
        },
        isUse: {
            type: dataTypes.BOOLEAN,
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
