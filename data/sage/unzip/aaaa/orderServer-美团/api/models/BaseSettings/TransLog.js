"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransLog {
}
exports.TransLog = TransLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('TransLog', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        optionType: {
            type: dataTypes.STRING(2),
            allowNull: false
        },
        transType: {
            type: dataTypes.STRING(2),
            allowNull: false
        },
        transNo: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        transDate: {
            type: dataTypes.DATE,
            allowNull: false
        },
        referNo: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        billNo: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        paymentCode: {
            type: dataTypes.STRING(10),
            allowNull: true
        },
        paymentName: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        cardNo: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        amount: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        merId: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        terId: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        terType: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        message: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        channelCode: {
            type: dataTypes.STRING(10),
            allowNull: true
        },
        channelName: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        refundNo: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        memo: {
            type: dataTypes.TEXT,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
