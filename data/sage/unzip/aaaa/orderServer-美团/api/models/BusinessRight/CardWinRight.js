"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardWinRight {
}
exports.CardWinRight = CardWinRight;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CardWinRight', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salesWinId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        cardId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
