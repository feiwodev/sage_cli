"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassEndSettlementDetail {
}
exports.ClassEndSettlementDetail = ClassEndSettlementDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ClassEndSettlementDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classEndSettlementId: {
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
