"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SoldTicketFingerprint {
}
exports.SoldTicketFingerprint = SoldTicketFingerprint;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SoldTicketFingerprint', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        soldTicketId: {
            type: dataTypes.INTEGER
        },
        fingersId: {
            type: dataTypes.INTEGER
        },
        features: {
            type: dataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
