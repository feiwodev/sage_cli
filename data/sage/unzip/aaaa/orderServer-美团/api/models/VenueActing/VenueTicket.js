"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VenueTicket {
}
exports.VenueTicket = VenueTicket;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VenueTicket', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        venueId: {
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
