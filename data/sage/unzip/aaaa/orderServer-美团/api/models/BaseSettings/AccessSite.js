"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessSite {
}
exports.AccessSite = AccessSite;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessSite', {
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
        areaId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        seqNo: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        isLimitNumber: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        limitNumber: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        address: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        contact: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        phone: {
            type: dataTypes.STRING(30),
            allowNull: true
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
                name: 'UK_AccessSite_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_AccessSite_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
