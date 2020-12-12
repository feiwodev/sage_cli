"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CrowdKind {
}
exports.CrowdKind = CrowdKind;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CrowdKind', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        parentId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        level: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        levelSeqNo: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        isLeaf: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        levelTree: {
            type: dataTypes.STRING(1024),
            allowNull: true
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        identifier: {
            type: dataTypes.STRING(30)
        },
        minAge: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        maxAge: {
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
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_CrowdKind_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_CrowdKind_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
