"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SoldRefundVoucher {
}
exports.SoldRefundVoucher = SoldRefundVoucher;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SoldRefundVoucher', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        soldVoucherId: {
            type: dataTypes.INTEGER
        },
        refundVoucherId: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
