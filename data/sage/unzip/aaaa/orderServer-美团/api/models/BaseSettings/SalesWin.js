"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesWin {
}
exports.SalesWin = SalesWin;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesWin', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salesSiteId: {
            type: dataTypes.INTEGER,
            allowNull: false
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
        uniqueCode: {
            type: dataTypes.STRING(20),
            allowNull: false
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
                name: 'UK_SalesWin_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_SalesWin_Name',
                fields: ['name']
            },
            {
                unique: true,
                name: 'UK_SalesWin_UniqueCode',
                fields: ['uniqueCode']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
