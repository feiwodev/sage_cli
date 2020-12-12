"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherProductSplit {
}
exports.VoucherProductSplit = VoucherProductSplit;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherProductSplit', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherDetailId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessId: {
            type: dataTypes.INTEGER
        },
        productId: {
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
