"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
}
exports.Product = Product;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Product', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        merchantId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        productCategoryId: {
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
        isSingle: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        numberRulesId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        inventoryWay: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        basicPrice: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        costPrice: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        nominalFee: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        nominalUnit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
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
                name: 'UK_Product_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_Product_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
