"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesSchemeSchedule {
}
exports.SalesSchemeSchedule = SalesSchemeSchedule;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesSchemeSchedule', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salesSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        startDay: {
            type: dataTypes.STRING(30)
        },
        endDay: {
            type: dataTypes.STRING(30)
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
