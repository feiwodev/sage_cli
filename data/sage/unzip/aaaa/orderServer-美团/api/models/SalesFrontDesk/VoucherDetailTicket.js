"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherDetailTicket {
}
exports.VoucherDetailTicket = VoucherDetailTicket;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherDetailTicket', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherDetailId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        startDate: {
            type: dataTypes.DATE,
            defaultValue: '2000-01-01 23:59:59'
        },
        endDate: {
            type: dataTypes.DATE,
            defaultValue: '2000-01-01 23:59:59'
        },
        startId: {
            type: dataTypes.STRING(30)
        },
        endId: {
            type: dataTypes.STRING(30)
        },
        startSerial: {
            type: dataTypes.STRING(50)
        },
        endSerial: {
            type: dataTypes.STRING(50)
        },
        ticketNumber: {
            type: dataTypes.INTEGER
        },
        nominalFee: {
            type: dataTypes.FLOAT
        },
        deposit: {
            type: dataTypes.FLOAT
        },
        handCharge: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
