"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteLog {
}
exports.DeleteLog = DeleteLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('DeleteLog', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tableName: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        tableId: {
            type: dataTypes.INTEGER,
            allowNull: false
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
