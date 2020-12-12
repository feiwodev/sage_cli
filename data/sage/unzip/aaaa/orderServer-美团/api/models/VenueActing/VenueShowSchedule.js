"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VenueShowSchedule {
}
exports.VenueShowSchedule = VenueShowSchedule;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VenueShowSchedule', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        venueId: {
            type: dataTypes.INTEGER,
            defaultValue: false
        },
        productId: {
            type: dataTypes.INTEGER
        },
        venueSessionId: {
            type: dataTypes.INTEGER
        },
        startDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        endDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        remaining: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        reserved: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        realSales: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
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
