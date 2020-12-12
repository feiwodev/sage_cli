"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TouristsAddress {
}
exports.TouristsAddress = TouristsAddress;
function default_1(sequelize, dataTypes) {
    return sequelize.define('TouristsAddress', {
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
        spellCode: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        certificateIndex: {
            type: dataTypes.STRING(6),
            allowNull: true
        },
        otherIndex: {
            type: dataTypes.STRING(6),
            allowNull: true
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_TouristsAddress_Name',
                fields: ['name']
            }],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
