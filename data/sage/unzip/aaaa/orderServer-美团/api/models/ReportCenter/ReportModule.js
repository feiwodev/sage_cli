"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportModule {
}
exports.ReportModule = ReportModule;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ReportModule', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            type: dataTypes.STRING(50)
        },
        name: {
            type: dataTypes.STRING(50)
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 4
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
