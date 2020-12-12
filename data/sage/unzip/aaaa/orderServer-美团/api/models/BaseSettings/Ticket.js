"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ticket {
}
exports.Ticket = Ticket;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Ticket', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        ticketImage: {
            type: dataTypes.STRING(512)
        },
        isRecharge: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        useLimit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        mediaType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        sellWay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        usage: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        passConfirm: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        hasIdCard: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        identifyRegister: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        identifyNumber: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        identifyStorage: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        verifyIdentify: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        imageScores: {
            type: dataTypes.INTEGER
        },
        featurePoints: {
            type: dataTypes.INTEGER
        },
        encrollScores: {
            type: dataTypes.INTEGER
        },
        verifyScores: {
            type: dataTypes.INTEGER
        },
        personTimeStat: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
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
