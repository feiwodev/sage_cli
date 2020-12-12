"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessCrowd {
}
exports.BusinessCrowd = BusinessCrowd;
function default_1(sequelize, dataTypes) {
    return sequelize.define('BusinessCrowd', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        businessSchemeId: {
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
