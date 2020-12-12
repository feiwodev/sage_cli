"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesWinHeartbeat {
}
exports.SalesWinHeartbeat = SalesWinHeartbeat;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesWinHeartbeat', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        salesWinId: {
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
