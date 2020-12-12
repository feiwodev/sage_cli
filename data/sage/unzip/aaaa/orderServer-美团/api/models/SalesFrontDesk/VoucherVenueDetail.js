"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherVenueDetail {
}
exports.VoucherVenueDetail = VoucherVenueDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherVenueDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherDetailId: {
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
