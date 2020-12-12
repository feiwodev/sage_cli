"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardLimitPurchase {
}
exports.CardLimitPurchase = CardLimitPurchase;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CardLimitPurchase', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        businessTicketId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        cardId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        limitPurchasePeriod: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        limitPurchaseUnits: {
            type: dataTypes.INTEGER,
            defaultValue: 2
        },
        purchaseNumber: {
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
