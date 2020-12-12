"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsumeSeqNo {
}
exports.ConsumeSeqNo = ConsumeSeqNo;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ConsumeSeqNo', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        consumeType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        accessGateId: {
            type: dataTypes.INTEGER
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
