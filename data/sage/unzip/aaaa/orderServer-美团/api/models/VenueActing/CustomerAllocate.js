"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerAllocate {
}
exports.CustomerAllocate = CustomerAllocate;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CustomerAllocate', {
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
        customerId: {
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
