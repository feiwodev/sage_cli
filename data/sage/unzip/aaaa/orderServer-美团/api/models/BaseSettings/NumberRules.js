"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NumberRules {
}
exports.NumberRules = NumberRules;
function default_1(sequelize, dataTypes) {
    return sequelize.define('NumberRules', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        rulesPrefix: {
            type: dataTypes.STRING(50)
        },
        serialNoLen: {
            type: dataTypes.INTEGER
        },
        rulesSuffix: {
            type: dataTypes.STRING(50)
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_NumberRules_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_NumberRules_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
