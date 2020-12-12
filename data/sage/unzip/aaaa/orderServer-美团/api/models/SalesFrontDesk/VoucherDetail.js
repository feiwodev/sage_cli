"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherDetail {
}
exports.VoucherDetail = VoucherDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        seqNo: {
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessPriceId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesSchemeId: {
            type: dataTypes.INTEGER
        },
        crowdKindId: {
            type: dataTypes.INTEGER
        },
        priceId: {
            type: dataTypes.INTEGER
        },
        discountSchemeId: {
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.FLOAT
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
