"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessSiteDaySum {
}
exports.AccessSiteDaySum = AccessSiteDaySum;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessSiteDaySum', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        areaId: {
            type: dataTypes.INTEGER
        },
        accessSiteId: {
            type: dataTypes.INTEGER
        },
        accessGateId: {
            type: dataTypes.INTEGER
        },
        ctrlDir: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.FLOAT
        },
        daily: {
            type: dataTypes.INTEGER
        },
        monthly: {
            type: dataTypes.INTEGER
        },
        annual: {
            type: dataTypes.INTEGER
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
