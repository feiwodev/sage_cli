"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderDetailTicket {
}
exports.OrderDetailTicket = OrderDetailTicket;
function default_1(sequelize, dataTypes) {
    return sequelize.define('OrderDetailTicket', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderDetailId: {
            type: dataTypes.INTEGER
        },
        startDate: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        endDate: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        ticketNumber: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        nominalFee: {
            type: dataTypes.FLOAT
        },
        deposit: {
            type: dataTypes.FLOAT
        },
        handCharge: {
            type: dataTypes.FLOAT
        },
        weekLimit: {
            type: dataTypes.STRING(30),
            defaultValue: '0000000'
        },
        dayLimit: {
            type: dataTypes.STRING(255)
        },
        weekendLimit: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
