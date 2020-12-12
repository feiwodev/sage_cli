"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StocksBillDetail {
}
exports.StocksBillDetail = StocksBillDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('StocksBillDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stocksBillId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        merchantId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        startId: {
            type: dataTypes.INTEGER
        },
        endId: {
            type: dataTypes.INTEGER
        },
        startSerial: {
            type: dataTypes.STRING(20)
        },
        endSerial: {
            type: dataTypes.STRING(20)
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        costPrice: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
