"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplitSettlementRule {
}
exports.SplitSettlementRule = SplitSettlementRule;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SplitSettlementRule', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        settlementId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        reservedAmount: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
