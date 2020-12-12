"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Visitor {
}
exports.Visitor = Visitor;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Visitor', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        sexes: {
            type: dataTypes.STRING(2),
            defaultValue: '男'
        },
        certificateCategoryId: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        idCard: {
            type: dataTypes.STRING(20)
        },
        birthdate: {
            type: dataTypes.STRING(30)
        },
        photoDir: {
            type: dataTypes.STRING(1024)
        },
        nation: {
            type: dataTypes.STRING(20)
        },
        homeAddress: {
            type: dataTypes.STRING(200)
        },
        issuingAuthority: {
            type: dataTypes.STRING(50)
        },
        validPeriod: {
            type: dataTypes.STRING(50)
        },
        phone: {
            type: dataTypes.STRING(50)
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        memo: {
            type: dataTypes.STRING(512)
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
