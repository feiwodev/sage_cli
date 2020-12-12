"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RankPrice {
}
exports.RankPrice = RankPrice;
function default_1(sequelize, dataTypes) {
    return sequelize.define('RankPrice', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rankCrowdId: {
            type: dataTypes.INTEGER
        },
        priceId: {
            type: dataTypes.INTEGER
        },
        discountSchemeId: {
            type: dataTypes.INTEGER
        },
        peopleNumRange: {
            type: dataTypes.INTEGER
        },
        actualSalePrice: {
            type: dataTypes.INTEGER
        },
        integralWay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        integralBaseNum: {
            type: dataTypes.INTEGER
        },
        integralNum: {
            type: dataTypes.INTEGER
        },
        sequence: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
