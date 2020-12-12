"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IntegralRules {
}
exports.IntegralRules = IntegralRules;
function default_1(sequelize, dataTypes) {
    return sequelize.define('IntegralRules', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rankRulesId: {
            type: dataTypes.INTEGER
        },
        businessId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        ticketId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        crowdKindId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        integralWay: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        integralBaseNum: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        integralNum: {
            type: dataTypes.INTEGER,
            allowNull: true
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
