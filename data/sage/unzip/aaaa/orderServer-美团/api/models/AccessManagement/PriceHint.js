"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PriceHint {
}
exports.PriceHint = PriceHint;
function default_1(sequelize, dataTypes) {
    return sequelize.define('PriceHint', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        priceId: {
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
