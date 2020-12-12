"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Professional {
}
exports.Professional = Professional;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Professional', {
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
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_Professional_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_Professional_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
