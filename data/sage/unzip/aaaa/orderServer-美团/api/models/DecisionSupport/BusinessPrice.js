"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessPrice {
}
exports.BusinessPrice = BusinessPrice;
function default_1(sequelize, dataTypes) {
    return sequelize.define('BusinessPrice', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        businessCrowdId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        priceId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discountSchemeId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        sequence: {
            type: dataTypes.INTEGER
        },
        isFixed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        peopleNumRange: {
            type: dataTypes.INTEGER
        },
        actualSalePrice: {
            type: dataTypes.FLOAT
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
