"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsumeLog {
}
exports.ConsumeLog = ConsumeLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ConsumeLog', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherDetailTicketId: {
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER
        },
        merchantId: {
            type: dataTypes.INTEGER
        },
        cardNo: {
            type: dataTypes.STRING(50)
        },
        accessGateId: {
            type: dataTypes.INTEGER
        },
        salesWinId: {
            type: dataTypes.INTEGER
        },
        consumeTime: {
            type: dataTypes.DATE
        },
        consumeAmount: {
            type: dataTypes.FLOAT
        },
        giveAmount: {
            type: dataTypes.FLOAT
        },
        consumeTimes: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        giveTimes: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        consumeWay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        serialNumber: {
            type: dataTypes.STRING(50)
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
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
