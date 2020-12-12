"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SiteAllocate {
}
exports.SiteAllocate = SiteAllocate;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SiteAllocate', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        channelPlanId: {
            type: dataTypes.INTEGER
        },
        venueSessionId: {
            type: dataTypes.INTEGER
        },
        salesSiteId: {
            type: dataTypes.INTEGER
        },
        allocateDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        outboundQuantity: {
            type: dataTypes.INTEGER
        },
        warehousingQuantity: {
            type: dataTypes.INTEGER
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
