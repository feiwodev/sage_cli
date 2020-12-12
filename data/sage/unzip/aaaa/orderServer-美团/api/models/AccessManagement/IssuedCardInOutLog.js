"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IssuedCardInOutLog {
}
exports.IssuedCardInOutLog = IssuedCardInOutLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('IssuedCardInOutLog', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        issuedCardId: {
            type: dataTypes.INTEGER
        },
        accessGateId: {
            type: dataTypes.INTEGER
        },
        cardNo: {
            type: dataTypes.STRING(50)
        },
        uniqueId: {
            type: dataTypes.STRING(50)
        },
        checkDir: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        daily: {
            type: dataTypes.INTEGER
        },
        monthly: {
            type: dataTypes.INTEGER
        },
        annual: {
            type: dataTypes.INTEGER
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
