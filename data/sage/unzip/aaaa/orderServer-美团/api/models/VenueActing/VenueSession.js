"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VenueSession {
}
exports.VenueSession = VenueSession;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VenueSession', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        startTime: {
            type: dataTypes.STRING(20)
        },
        duration: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        endTime: {
            type: dataTypes.STRING(20)
        },
        aheadTime: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        lagTime: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        capacity: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        reserved: {
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
        indexes: [{
                unique: true,
                name: 'UK_VenueSession_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_VenueSession_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
