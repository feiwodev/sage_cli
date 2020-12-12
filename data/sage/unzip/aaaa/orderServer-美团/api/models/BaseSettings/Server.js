"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Server {
}
exports.Server = Server;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Server', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        areaId: {
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
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        uniqueCode: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        netMask: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        gateWay: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        dnsIp: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_Server_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_Server_Name',
                fields: ['name']
            },
            {
                unique: true,
                name: 'UK_Server_UniqueCode',
                fields: ['uniqueCode']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
