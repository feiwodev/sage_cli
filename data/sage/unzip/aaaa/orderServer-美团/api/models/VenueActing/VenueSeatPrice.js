"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VenueSeatPrice {
}
exports.VenueSeatPrice = VenueSeatPrice;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VenueSeatPrice', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        venueSessionId: {
            type: dataTypes.INTEGER
        },
        businessPriceId: {
            type: dataTypes.INTEGER
        },
        venueAreaId: {
            type: dataTypes.INTEGER
        },
        backgroundColor: {
            type: dataTypes.STRING(50)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
