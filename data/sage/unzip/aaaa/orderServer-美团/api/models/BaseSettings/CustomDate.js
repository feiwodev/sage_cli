"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomDate {
}
exports.CustomDate = CustomDate;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CustomDate', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dateType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        minuteValue: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        timeValue: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        dateValue: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        monthValue: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        agoLater: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        calculate: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    });
}
exports.default = default_1;
