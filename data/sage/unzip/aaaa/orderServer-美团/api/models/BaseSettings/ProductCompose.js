"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductCompose {
}
exports.ProductCompose = ProductCompose;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ProductCompose', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productSubId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        sellLimit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        composeNum: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        actualAmount: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
