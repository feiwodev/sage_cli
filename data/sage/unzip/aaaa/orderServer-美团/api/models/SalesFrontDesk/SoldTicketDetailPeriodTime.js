"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SoldTicketDetailPeriodTime {
}
exports.SoldTicketDetailPeriodTime = SoldTicketDetailPeriodTime;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SoldTicketDetailPeriodTime', {
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
        soldTicketDetailId: {
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
