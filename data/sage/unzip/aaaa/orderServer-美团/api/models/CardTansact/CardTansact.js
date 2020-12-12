"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardTansact {
}
exports.CardTansact = CardTansact;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CardTansact', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        cardId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        issuedCardId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesSiteId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesWinId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        seller: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        maker: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        receivable: {
            type: dataTypes.FLOAT
        },
        paid: {
            type: dataTypes.FLOAT
        },
        change: {
            type: dataTypes.FLOAT
        },
        settlementId: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_CardTansact_Number',
                fields: ['number']
            }],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
