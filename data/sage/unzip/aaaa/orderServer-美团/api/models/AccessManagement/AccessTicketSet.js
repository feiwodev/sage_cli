"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessTicketSet {
}
exports.AccessTicketSet = AccessTicketSet;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessTicketSet', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessSiteId: {
            type: dataTypes.INTEGER
        },
        businessTicketId: {
            type: dataTypes.INTEGER
        },
        totalTimes: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        totalAmount: {
            type: dataTypes.FLOAT
        },
        singleTimes: {
            type: dataTypes.INTEGER
        },
        singleAmount: {
            type: dataTypes.INTEGER
        },
        passWay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        hintMode: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        checkMode: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
