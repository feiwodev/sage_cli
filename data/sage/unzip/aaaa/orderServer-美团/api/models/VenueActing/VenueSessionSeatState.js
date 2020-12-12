"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VenueSessionSeatState {
}
exports.VenueSessionSeatState = VenueSessionSeatState;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VenueSessionSeatState', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        venueSessionId: {
            type: dataTypes.INTEGER
        },
        venueSeatId: {
            type: dataTypes.INTEGER
        },
        ticketId: {
            type: dataTypes.INTEGER
        },
        showDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        seatState: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        salesWinId: {
            type: dataTypes.INTEGER
        },
        employeeId: {
            type: dataTypes.INTEGER
        },
        voucherId: {
            type: dataTypes.INTEGER
        },
        serialNumber: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        modifyDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        lockendDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        reservationendDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
