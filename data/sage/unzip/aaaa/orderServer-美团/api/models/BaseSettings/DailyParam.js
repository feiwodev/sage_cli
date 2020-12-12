"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DailyParam {
}
exports.DailyParam = DailyParam;
function default_1(sequelize, dataTypes) {
    return sequelize.define('DailyParam', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        inventoryCursorStart: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isAllotConfirm: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        isReceiveConfirm: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        isBalanceConfirm: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        isReceiveValid: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        cursorStart: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isChangeAddress: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        hasIdCard: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        isReceiptConfirm: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        isCardConfirm: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        splitType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        splitWay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        splitCycle: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        splitCycleType: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        }
    });
}
exports.default = default_1;
