"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MobileUnionVoucher {
}
exports.MobileUnionVoucher = MobileUnionVoucher;
function default_1(sequelize, dataTypes) {
    return sequelize.define('MobileUnionVoucher', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        voucherNumber: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        traceNO: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        refNO: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        transTime: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
