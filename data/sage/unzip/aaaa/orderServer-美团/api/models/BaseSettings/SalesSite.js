"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesSite {
}
exports.SalesSite = SalesSite;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesSite', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        areaId: {
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
        contact: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        phone: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        address: {
            type: dataTypes.STRING(200),
            allowNull: true
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
                name: 'UK_SalesSite_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_SalesSite_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
