"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Settlement {
}
exports.Settlement = Settlement;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Settlement', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        settlementCategoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        depositBank: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        swipeSettle: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isAllowChange: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        scancodeWay: {
            type: dataTypes.INTEGER,
            defaultValue: true
        },
        payeerChannelId: {
            type: dataTypes.INTEGER,
            defaultValue: true
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_Settlement_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_Settlement_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
