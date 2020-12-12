"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IssuedCardFaceFeature {
}
exports.IssuedCardFaceFeature = IssuedCardFaceFeature;
function default_1(sequelize, dataTypes) {
    return sequelize.define('IssuedCardFaceFeature', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        issuedCardId: {
            type: dataTypes.INTEGER
        },
        faceFeature: {
            type: dataTypes.TEXT
        },
        left: {
            type: dataTypes.INTEGER
        },
        right: {
            type: dataTypes.INTEGER
        },
        top: {
            type: dataTypes.INTEGER
        },
        bottom: {
            type: dataTypes.INTEGER
        },
        faceImage: {
            type: dataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
