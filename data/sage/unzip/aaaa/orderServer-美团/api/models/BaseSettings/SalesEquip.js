"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesEquip {
}
exports.SalesEquip = SalesEquip;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesEquip', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salesWinId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        equipId: {
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
        version: {
            type: dataTypes.STRING(30),
            allowNull: true
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
                name: 'UK_SalesEquip_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_SalesEquip_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
