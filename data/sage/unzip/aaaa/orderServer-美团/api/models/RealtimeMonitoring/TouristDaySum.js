"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TouristDaySum {
}
exports.TouristDaySum = TouristDaySum;
function default_1(sequelize, dataTypes) {
    return sequelize.define('TouristDaySum', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(30)
        },
        age: {
            type: dataTypes.INTEGER
        },
        sexes: {
            type: dataTypes.INTEGER
        },
        idCard: {
            type: dataTypes.STRING(20)
        },
        phone: {
            type: dataTypes.STRING(30)
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
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
