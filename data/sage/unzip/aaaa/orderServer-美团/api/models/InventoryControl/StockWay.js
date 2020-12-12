"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StockWay {
}
exports.StockWay = StockWay;
function default_1(sequelize, dataTypes) {
    return sequelize.define('StockWay', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        plusMinus: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_StockWay_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_StockWay_Name',
                fields: ['name']
            }
        ]
    });
}
exports.default = default_1;
