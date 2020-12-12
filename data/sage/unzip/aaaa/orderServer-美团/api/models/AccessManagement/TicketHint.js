"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TicketHint {
}
exports.TicketHint = TicketHint;
function default_1(sequelize, dataTypes) {
    return sequelize.define('TicketHint', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ticketId: {
            type: dataTypes.INTEGER
        },
        voiceFile: {
            type: dataTypes.STRING(512)
        },
        textMsg: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
