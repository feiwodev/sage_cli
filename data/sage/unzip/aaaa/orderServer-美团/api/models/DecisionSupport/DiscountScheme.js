"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscountScheme {
}
exports.DiscountScheme = DiscountScheme;
function default_1(sequelize, dataTypes) {
    return sequelize.define('DiscountScheme', {
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
        categoryType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        multiples: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        quantity: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isTicket: {
            type: dataTypes.INTEGER,
            defaultValue: 1
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
                name: 'UK_DiscountScheme_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_DiscountScheme_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
