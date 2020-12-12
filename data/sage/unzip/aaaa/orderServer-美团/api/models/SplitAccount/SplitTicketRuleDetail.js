"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplitTicketRuleDetail {
}
exports.SplitTicketRuleDetail = SplitTicketRuleDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SplitTicketRuleDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        splitTicketRuleId: {
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
