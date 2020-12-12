"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IssuedCardFingerprint {
}
exports.IssuedCardFingerprint = IssuedCardFingerprint;
function default_1(sequelize, dataTypes) {
    return sequelize.define('IssuedCardFingerprint', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        issuedCardId: {
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
