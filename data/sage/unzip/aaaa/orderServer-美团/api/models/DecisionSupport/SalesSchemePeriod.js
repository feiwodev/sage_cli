"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesSchemePeriod {
}
exports.SalesSchemePeriod = SalesSchemePeriod;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesSchemePeriod', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salesSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        firstPeriod: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        startTime: {
            type: dataTypes.STRING(30)
        },
        endTime: {
            type: dataTypes.STRING(30)
        },
        limitNumber: {
            type: dataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
