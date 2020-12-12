"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EquipHeartbeat {
}
exports.EquipHeartbeat = EquipHeartbeat;
function default_1(sequelize, dataTypes) {
    return sequelize.define('EquipHeartbeat', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessGateId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        heartbeatAt: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
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
