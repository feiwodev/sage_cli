"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessSchemePeriodTime {
}
exports.AccessSchemePeriodTime = AccessSchemePeriodTime;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessSchemePeriodTime', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        firstPeriod: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        startTime: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        endTime: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        limitTimes: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        latentAgainst: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
