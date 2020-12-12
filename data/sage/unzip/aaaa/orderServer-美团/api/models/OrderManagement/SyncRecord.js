"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SyncRecord {
}
exports.SyncRecord = SyncRecord;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SyncRecord', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        syncType: {
            type: dataTypes.STRING(50)
        },
        syncId: {
            type: dataTypes.INTEGER
        },
        syncTime: {
            type: dataTypes.DATE
        },
        areaId: {
            type: dataTypes.INTEGER
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
