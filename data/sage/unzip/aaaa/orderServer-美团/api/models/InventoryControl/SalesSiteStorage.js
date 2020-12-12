"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesSiteStorage {
}
exports.SalesSiteStorage = SalesSiteStorage;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesSiteStorage', {
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
        actualNumber: {
            type: dataTypes.INTEGER
        },
        maxNumber: {
            type: dataTypes.INTEGER
        },
        safetyNumber: {
            type: dataTypes.INTEGER
        },
        minNumber: {
            type: dataTypes.INTEGER
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
