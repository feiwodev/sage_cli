"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessSchemeSchedule {
}
exports.AccessSchemeSchedule = AccessSchemeSchedule;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessSchemeSchedule', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        startDay: {
            type: dataTypes.STRING,
            allowNull: false
        },
        endDay: {
            type: dataTypes.STRING,
            allowNull: false
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
