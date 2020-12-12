"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessCardSet {
}
exports.AccessCardSet = AccessCardSet;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessCardSet', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessSiteId: {
            type: dataTypes.INTEGER
        },
        cardId: {
            type: dataTypes.INTEGER
        },
        totalAmount: {
            type: dataTypes.FLOAT
        },
        singleAmount: {
            type: dataTypes.INTEGER
        },
        interval: {
            type: dataTypes.FLOAT
        },
        checkWay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        identityMode: {
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
