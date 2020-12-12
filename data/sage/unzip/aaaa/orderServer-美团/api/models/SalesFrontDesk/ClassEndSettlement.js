"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassEndSettlement {
}
exports.ClassEndSettlement = ClassEndSettlement;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ClassEndSettlement', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classEndId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productCategoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        settlementId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        priceId: {
            type: dataTypes.INTEGER
        },
        paid: {
            type: dataTypes.INTEGER
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        price: {
            type: dataTypes.FLOAT
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
