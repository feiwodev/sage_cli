"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardSync {
}
exports.CardSync = CardSync;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CardSync', {
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
        syncType: {
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
