"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplitSettlementRuleDetail {
}
exports.SplitSettlementRuleDetail = SplitSettlementRuleDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SplitSettlementRuleDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        splitRuleId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        merchantId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
