"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IssuedCardDetailPeriodTime {
}
exports.IssuedCardDetailPeriodTime = IssuedCardDetailPeriodTime;
function default_1(sequelize, dataTypes) {
    return sequelize.define('IssuedCardDetailPeriodTime', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        accessSchemePeriodTimeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        issuedCardDetailId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        passedTimes: {
            type: dataTypes.INTEGER
        },
        lastCheckTime: {
            type: dataTypes.DATE
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
