"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Member {
}
exports.Member = Member;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Member', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        sexes: {
            type: dataTypes.STRING(2),
            defaultValue: '男'
        },
        idCard: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        birthdate: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        photoDir: {
            type: dataTypes.STRING(1024),
            allowNull: true
        },
        nation: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        homeAddress: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        issuingAuthority: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        validPeriod: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        phone: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: dataTypes.STRING(20),
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
