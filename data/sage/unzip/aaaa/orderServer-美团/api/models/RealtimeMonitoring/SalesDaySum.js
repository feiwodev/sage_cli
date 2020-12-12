"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesDaySum {
}
exports.SalesDaySum = SalesDaySum;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesDaySum', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salesWinId: {
            type: dataTypes.INTEGER
        },
        businessId: {
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.FLOAT
        },
        hourly: {
            type: dataTypes.INTEGER
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
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
