"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rebate {
}
exports.Rebate = Rebate;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Rebate', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
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
