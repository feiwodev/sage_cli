"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SoldVenueTicket {
}
exports.SoldVenueTicket = SoldVenueTicket;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SoldVenueTicket', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        soldTicketId: {
            type: dataTypes.INTEGER
        },
        venueSessionId: {
            type: dataTypes.INTEGER
        },
        sessionDate: {
            type: dataTypes.DATE
        },
        venueSeatId: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
