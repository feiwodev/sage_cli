"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RankScheme {
}
exports.RankScheme = RankScheme;
function default_1(sequelize, dataTypes) {
    return sequelize.define('RankScheme', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rankRulesId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
