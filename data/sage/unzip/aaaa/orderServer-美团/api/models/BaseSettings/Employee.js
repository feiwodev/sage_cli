"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
}
exports.Employee = Employee;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Employee', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        isSysUser: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        password: {
            type: dataTypes.STRING(20),
            defaultValue: 'asd123456'
        },
        loginType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        code: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        sexes: {
            type: dataTypes.STRING(2),
            defaultValue: '男'
        },
        idCard: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        birthdate: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        photoDir: {
            type: dataTypes.STRING(1024),
            allowNull: true
        },
        nationId: {
            type: dataTypes.INTEGER
        },
        issuingAuthority: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        validPeriod: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        isMarry: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        entryDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        positionId: {
            type: dataTypes.INTEGER
        },
        phone: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        nativePlaceId: {
            type: dataTypes.INTEGER
        },
        homeAddress: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        educationalId: {
            type: dataTypes.INTEGER
        },
        majorId: {
            type: dataTypes.INTEGER
        },
        professionalId: {
            type: dataTypes.INTEGER
        },
        school: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        graduateDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_Employee_Code',
                fields: ['code']
            }],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
