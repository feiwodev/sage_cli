"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Equip {
}
exports.Equip = Equip;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Equip', {
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
            allowNull: true
        },
        model: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        commMode: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        version: {
            type: dataTypes.STRING(30),
            allowNull: true
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
                name: 'UK_Equip_Code',
                fields: ['code']
            }],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
