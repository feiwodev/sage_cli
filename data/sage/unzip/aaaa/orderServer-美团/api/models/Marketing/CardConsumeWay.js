"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardConsumeWay {
}
exports.CardConsumeWay = CardConsumeWay;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CardConsumeWay', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        businessPriceId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        cardId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        consumeWay: {
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
