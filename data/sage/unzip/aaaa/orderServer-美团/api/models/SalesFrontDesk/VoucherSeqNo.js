"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherSeqNo {
}
exports.VoucherSeqNo = VoucherSeqNo;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherSeqNo', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        salesWinId: {
            type: dataTypes.INTEGER
        },
        maker: {
            type: dataTypes.INTEGER
        },
        seqNo: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
