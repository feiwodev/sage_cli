"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherInvoice {
}
exports.VoucherInvoice = VoucherInvoice;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherInvoice', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        taxTotal: {
            type: dataTypes.FLOAT
        },
        taxFree: {
            type: dataTypes.FLOAT
        },
        invoiceType: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        code: {
            type: dataTypes.STRING(12)
        },
        phone: {
            type: dataTypes.STRING(8)
        },
        invoiceDate: {
            type: dataTypes.DATE
        },
        maker: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
