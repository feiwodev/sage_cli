"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessSync {
}
exports.AccessSync = AccessSync;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessSync', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tableName: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        accessGateId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        syncId: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        syncDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        scanDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        status: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
