"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IssuedCard {
}
exports.IssuedCard = IssuedCard;
function default_1(sequelize, dataTypes) {
    return sequelize.define('IssuedCard', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cardId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        uniqueId: {
            type: dataTypes.STRING(50)
        },
        cardNo: {
            type: dataTypes.STRING(50)
        },
        name: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        idCard: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        phone: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        startDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        endDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        password: {
            type: dataTypes.STRING(20),
            defaultValue: 'asd123456'
        },
        state: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        usedTimes: {
            type: dataTypes.INTEGER
        },
        remainTimes: {
            type: dataTypes.INTEGER
        },
        discountTimes: {
            type: dataTypes.INTEGER
        },
        usedAmount: {
            type: dataTypes.FLOAT
        },
        remainAmount: {
            type: dataTypes.FLOAT
        },
        discountAmount: {
            type: dataTypes.FLOAT
        },
        deposit: {
            type: dataTypes.FLOAT
        },
        usedNumber: {
            type: dataTypes.INTEGER
        },
        remainNumber: {
            type: dataTypes.INTEGER
        },
        discountNumber: {
            type: dataTypes.INTEGER
        },
        guaranteeAmount: {
            type: dataTypes.FLOAT
        },
        creditAmount: {
            type: dataTypes.FLOAT
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
