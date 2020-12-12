"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplitTicketRule {
}
exports.SplitTicketRule = SplitTicketRule;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SplitTicketRule', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
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
