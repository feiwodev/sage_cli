"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessEquipLog {
}
exports.AccessEquipLog = AccessEquipLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessEquipLog', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessGateId: {
            type: dataTypes.INTEGER
        },
        type: {
            type: dataTypes.INTEGER
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
