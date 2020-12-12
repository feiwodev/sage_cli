"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RankRules {
}
exports.RankRules = RankRules;
function default_1(sequelize, dataTypes) {
    return sequelize.define('RankRules', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerCategoryId: {
            type: dataTypes.INTEGER
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        rankLevel: {
            type: dataTypes.INTEGER
        },
        upgradeBaseNum: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        creditAmount: {
            type: dataTypes.FLOAT,
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
