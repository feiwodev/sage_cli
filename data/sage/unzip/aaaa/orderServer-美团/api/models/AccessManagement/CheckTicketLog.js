"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckTicketLog {
}
exports.CheckTicketLog = CheckTicketLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CheckTicketLog', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherDetailTicketId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessTicketId: {
            type: dataTypes.INTEGER,
            allowNull: false
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
        accessGateId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        brushCardTime: {
            type: dataTypes.DATE
        },
        singleTimes: {
            type: dataTypes.INTEGER
        },
        singleAmount: {
            type: dataTypes.FLOAT
        },
        checkDir: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        daily: {
            type: dataTypes.INTEGER
        },
        monthly: {
            type: dataTypes.INTEGER
        },
        annual: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
