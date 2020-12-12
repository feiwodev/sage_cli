"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesSiteBalance {
}
exports.SalesSiteBalance = SalesSiteBalance;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesSiteBalance', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        salesSiteId: {
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER
        },
        stockWayId: {
            type: dataTypes.INTEGER
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
