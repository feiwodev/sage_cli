"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderDetailPerson {
}
exports.OrderDetailPerson = OrderDetailPerson;
function default_1(sequelize, dataTypes) {
    return sequelize.define('OrderDetailPerson', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderDetailId: {
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING(30)
        },
        uniqueCode: {
            type: dataTypes.INTEGER
        },
        idCard: {
            type: dataTypes.STRING(20)
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
        isChecked: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
