"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SoldTicketDetail {
}
exports.SoldTicketDetail = SoldTicketDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SoldTicketDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        soldTicketId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        accessSiteId: {
            type: dataTypes.INTEGER
        },
        consumeType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        singleTimes: {
            type: dataTypes.INTEGER
        },
        remainTimes: {
            type: dataTypes.INTEGER
        },
        usedTimes: {
            type: dataTypes.INTEGER
        },
        singleAmount: {
            type: dataTypes.FLOAT
        },
        remainAmount: {
            type: dataTypes.FLOAT
        },
        usedAmount: {
            type: dataTypes.FLOAT
        },
        lastCheckTime: {
            type: dataTypes.DATE
        },
        lastCheckDir: {
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
