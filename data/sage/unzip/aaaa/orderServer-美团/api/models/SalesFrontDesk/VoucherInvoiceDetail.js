"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherInvoiceDetail {
}
exports.VoucherInvoiceDetail = VoucherInvoiceDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherInvoiceDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherInvoiceId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        taxMark: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        taxRate: {
            type: dataTypes.FLOAT
        },
        taxFree: {
            type: dataTypes.FLOAT
        },
        tax: {
            type: dataTypes.FLOAT
        },
        taxAmount: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
