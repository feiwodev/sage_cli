"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VenueSessionSalesHold {
}
exports.VenueSessionSalesHold = VenueSessionSalesHold;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VenueSessionSalesHold', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        voucherNumber: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        venueShowScheduleId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        holdTime: {
            type: dataTypes.DATE,
            defaultValue: new Date(0),
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
