"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Venue {
}
exports.Venue = Venue;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Venue', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        capacity: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        address: {
            type: dataTypes.STRING(512),
            defaultValue: ''
        },
        contacts: {
            type: dataTypes.STRING(30),
            defaultValue: ''
        },
        phone: {
            type: dataTypes.STRING(50),
            defaultValue: 0
        },
        coords: {
            type: dataTypes.STRING(1024),
            defaultValue: ''
        },
        status: {
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
                name: 'UK_Venue_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_Venue_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
