"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessScheme {
}
exports.AccessScheme = AccessScheme;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessScheme', {
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
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_AccessScheme_Name',
                fields: ['name']
            },
            {
                unique: true,
                name: 'UK_AccessScheme_Code',
                fields: ['code']
            }
        ]
    });
}
exports.default = default_1;
