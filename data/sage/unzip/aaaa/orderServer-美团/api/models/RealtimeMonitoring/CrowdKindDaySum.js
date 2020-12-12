"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CrowdKindDaySum {
}
exports.CrowdKindDaySum = CrowdKindDaySum;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CrowdKindDaySum', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        crowdKindId: {
            type: dataTypes.INTEGER
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
