"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resident {
}
exports.Resident = Resident;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Resident', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        regionalId: {
            type: dataTypes.INTEGER
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        sexes: {
            type: dataTypes.STRING(2),
            defaultValue: '男'
        },
        idCard: {
            type: dataTypes.STRING(20)
        },
        birthdate: {
            type: dataTypes.STRING(30)
        },
        photoDir: {
            type: dataTypes.TEXT
        },
        nation: {
            type: dataTypes.STRING(20)
        },
        homeAddress: {
            type: dataTypes.STRING(100)
        },
        issuingAuthority: {
            type: dataTypes.STRING(100)
        },
        validPeriod: {
            type: dataTypes.STRING(50)
        },
        phone: {
            type: dataTypes.STRING(20)
        },
        email: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_Resident_Code',
                fields: ['code']
            }],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
