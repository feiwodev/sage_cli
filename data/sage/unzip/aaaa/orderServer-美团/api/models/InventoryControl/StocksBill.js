"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StocksBill {
}
exports.StocksBill = StocksBill;
function default_1(sequelize, dataTypes) {
    return sequelize.define('StocksBill', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: dataTypes.STRING(30)
        },
        areaId: {
            type: dataTypes.INTEGER
        },
        inSalesSiteId: {
            type: dataTypes.INTEGER
        },
        outSalesSiteId: {
            type: dataTypes.INTEGER
        },
        stockWayId: {
            type: dataTypes.INTEGER
        },
        handler: {
            type: dataTypes.INTEGER
        },
        maker: {
            type: dataTypes.INTEGER
        },
        auditor: {
            type: dataTypes.INTEGER
        },
        annual: {
            type: dataTypes.INTEGER
        },
        monthly: {
            type: dataTypes.INTEGER
        },
        daily: {
            type: dataTypes.INTEGER
        },
        makeDate: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        billState: {
            type: dataTypes.INTEGER
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_StocksBill_Number',
                fields: ['number']
            }],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
