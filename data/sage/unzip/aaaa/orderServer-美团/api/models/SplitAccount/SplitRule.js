"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplitRule {
}
exports.SplitRule = SplitRule;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SplitRule', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        businessPriceId: {
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
