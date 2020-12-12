"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SyncMessage {
}
exports.SyncMessage = SyncMessage;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SyncMessage', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tryCount: {
            type: dataTypes.INTEGER
        },
        messageId: {
            type: dataTypes.STRING(40)
        },
        messageBody: {
            type: dataTypes.TEXT
        },
        errorInfo: {
            type: dataTypes.TEXT
        },
        mode: {
            type: dataTypes.INTEGER
        },
        type: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
