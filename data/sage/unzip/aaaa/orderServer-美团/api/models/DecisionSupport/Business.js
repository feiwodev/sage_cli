"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Business {
}
exports.Business = Business;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Business', {
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
        isFreeCompose: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        marketingWay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        customerCategoryId: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        confirmCustomer: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        hasTouristsAddress: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        hasGuide: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        hasManager: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isPrintReceipt: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isPrintInvoice: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isTakeTicket: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        sampleNumber: {
            type: dataTypes.INTEGER,
            allowNull: true
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
                name: 'UK_Business_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_Business_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
