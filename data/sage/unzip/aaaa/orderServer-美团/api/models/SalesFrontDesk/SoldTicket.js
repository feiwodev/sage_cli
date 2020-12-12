"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SoldTicket {
}
exports.SoldTicket = SoldTicket;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SoldTicket', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherDetailTicketId: {
            type: dataTypes.INTEGER
        },
        businessTicketId: {
            type: dataTypes.INTEGER
        },
        idCard: {
            type: dataTypes.STRING(20)
        },
        uniqueId: {
            type: dataTypes.STRING(50)
        },
        ticketNo: {
            type: dataTypes.STRING(50)
        },
        usedTimes: {
            type: dataTypes.INTEGER
        },
        remainTimes: {
            type: dataTypes.INTEGER
        },
        discountTimes: {
            type: dataTypes.INTEGER
        },
        usedAmount: {
            type: dataTypes.FLOAT
        },
        remainAmount: {
            type: dataTypes.FLOAT
        },
        discountAmount: {
            type: dataTypes.FLOAT
        },
        price: {
            type: dataTypes.FLOAT
        },
        crowdKindId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        priceId: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        isOnLine: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        refundAmount: {
            type: dataTypes.FLOAT
        },
        forceRefundAmount: {
            type: dataTypes.FLOAT
        },
        reservedAmount: {
            type: dataTypes.FLOAT
        },
        deposit: {
            type: dataTypes.FLOAT
        },
        handCharge: {
            type: dataTypes.FLOAT
        },
        isRefundBalance: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        startTime: {
            type: dataTypes.STRING(30)
        },
        endTime: {
            type: dataTypes.STRING(30)
        },
        weekLimit: {
            type: dataTypes.STRING(30),
            defaultValue: '0000000'
        },
        dayLimit: {
            type: dataTypes.STRING
        },
        state: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        qrcodePath: {
            type: dataTypes.STRING(255)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
