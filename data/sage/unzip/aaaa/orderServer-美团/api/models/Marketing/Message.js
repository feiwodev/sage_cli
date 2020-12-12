"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
}
exports.Message = Message;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Message', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: dataTypes.INTEGER
        },
        content: {
            type: dataTypes.STRING(1024),
            allowNull: false
        },
        sender: {
            type: dataTypes.INTEGER
        },
        receiver: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        receiverType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
