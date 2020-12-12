"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplitRuleDetail {
}
exports.SplitRuleDetail = SplitRuleDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SplitRuleDetail', {
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
