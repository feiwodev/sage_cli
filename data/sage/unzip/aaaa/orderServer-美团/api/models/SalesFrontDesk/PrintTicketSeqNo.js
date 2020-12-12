"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrintTicketSeqNo {
}
exports.PrintTicketSeqNo = PrintTicketSeqNo;
function default_1(sequelize, dataTypes) {
    return sequelize.define('PrintTicketSeqNo', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: dataTypes.INTEGER
        },
        salesWinId: {
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
