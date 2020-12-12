"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessGate {
}
exports.AccessGate = AccessGate;
function default_1(sequelize, dataTypes) {
    return sequelize.define('AccessGate', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accessSiteId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        equipId: {
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
        uniqueCode: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        ctrlDir: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        interval: {
            type: dataTypes.FLOAT,
            allowNull: true
        },
        workMode: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        networkMode: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        secretKey: {
            type: dataTypes.STRING(50)
        },
        accessType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_AccessGate_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_AccessGate_Name',
                fields: ['name']
            },
            {
                unique: true,
                name: 'UK_AccessGate_UniqueCode',
                fields: ['uniqueCode']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
