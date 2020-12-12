"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TouristsAddressDaySum {
}
exports.TouristsAddressDaySum = TouristsAddressDaySum;
function default_1(sequelize, dataTypes) {
    return sequelize.define('TouristsAddressDaySum', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        touristsAddressId: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.FLOAT
        },
        daily: {
            type: dataTypes.INTEGER
        },
        monthly: {
            type: dataTypes.INTEGER
        },
        annual: {
            type: dataTypes.INTEGER
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
