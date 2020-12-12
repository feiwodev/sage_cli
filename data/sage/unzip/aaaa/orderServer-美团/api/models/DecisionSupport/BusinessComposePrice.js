"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessComposePrice {
}
exports.BusinessComposePrice = BusinessComposePrice;
function default_1(sequelize, dataTypes) {
    return sequelize.define('BusinessComposePrice', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        businessPriceId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        ticketId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        actualSalePrice: {
            type: dataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
