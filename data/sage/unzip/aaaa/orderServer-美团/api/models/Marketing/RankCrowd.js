"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RankCrowd {
}
exports.RankCrowd = RankCrowd;
function default_1(sequelize, dataTypes) {
    return sequelize.define('RankCrowd', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rankSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        crowdKindId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
