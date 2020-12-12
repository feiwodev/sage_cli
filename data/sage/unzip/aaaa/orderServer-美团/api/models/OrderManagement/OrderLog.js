"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderLog {
}
exports.OrderLog = OrderLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('OrderLog', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        areaId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        orderId: {
            type: dataTypes.INTEGER
        },
        number: {
            type: dataTypes.STRING(30)
        },
        status: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        isSync: {
            type: dataTypes.INTEGER,
            defaultValue: 0
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
