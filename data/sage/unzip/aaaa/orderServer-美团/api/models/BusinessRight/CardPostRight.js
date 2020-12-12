"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardPostRight {
}
exports.CardPostRight = CardPostRight;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CardPostRight', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        postId: {
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
