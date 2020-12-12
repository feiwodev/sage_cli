"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SiteDayState {
}
exports.SiteDayState = SiteDayState;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SiteDayState', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salesSiteId: {
            type: dataTypes.INTEGER
        },
        date: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        isUse: {
            type: dataTypes.BOOLEAN,
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
