"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VenueArea {
}
exports.VenueArea = VenueArea;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VenueArea', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        parentId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        level: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        levelSeqNo: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        isLeaf: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        levelTree: {
            type: dataTypes.STRING(1024),
            allowNull: true
        },
        venueId: {
            type: dataTypes.INTEGER,
            defaultValue: false
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        minCoords: {
            type: dataTypes.STRING(1024),
            defaultValue: ''
        },
        maxCoords: {
            type: dataTypes.STRING(1024),
            defaultValue: ''
        },
        maxNameX: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        maxNameY: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        maxSeatX: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        maxSeatY: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        minNameX: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        minNameY: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        minSeatX: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        minSeatY: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        imagePath: {
            type: dataTypes.STRING(512),
            defaultValue: ''
        },
        rows: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        columns: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        seats: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        noSeats: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        capacity: {
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
                name: 'UK_VenueArea_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_VenueArea_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
