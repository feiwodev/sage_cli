"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesScheme {
}
exports.SalesScheme = SalesScheme;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesScheme', {
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
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        nature: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        advanceDays: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        isOnLine: {
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
                name: 'UK_SalesScheme_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_SalesScheme_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
