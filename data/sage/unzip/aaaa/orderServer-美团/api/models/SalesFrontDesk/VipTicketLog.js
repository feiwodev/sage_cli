"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VipTicketLog {
}
exports.VipTicketLog = VipTicketLog;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VipTicketLog', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        ticketId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        soldTicketId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesSiteId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesWinId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        maker: {
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
