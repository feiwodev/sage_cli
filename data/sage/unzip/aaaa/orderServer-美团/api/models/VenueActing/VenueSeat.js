"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VenueSeat {
}
exports.VenueSeat = VenueSeat;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VenueSeat', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        venueAreaId: {
            type: dataTypes.INTEGER
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        gridRow: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        gridColumn: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        seatRow: {
            type: dataTypes.STRING(50),
            defaultValue: 0
        },
        seatColumn: {
            type: dataTypes.STRING(1024),
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
