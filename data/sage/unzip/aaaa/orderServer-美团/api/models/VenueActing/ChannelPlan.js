"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChannelPlan {
}
exports.ChannelPlan = ChannelPlan;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ChannelPlan', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: dataTypes.INTEGER
        },
        venueSessionId: {
            type: dataTypes.INTEGER
        },
        channelId: {
            type: dataTypes.INTEGER
        },
        quantity: {
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
