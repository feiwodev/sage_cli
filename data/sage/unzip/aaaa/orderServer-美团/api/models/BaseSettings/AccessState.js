"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessState {
}
exports.AccessState = AccessState;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessState', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accessSiteId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        dailyUsedTimes: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        lastCheckTime: {
            type: dataTypes.DATE
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
