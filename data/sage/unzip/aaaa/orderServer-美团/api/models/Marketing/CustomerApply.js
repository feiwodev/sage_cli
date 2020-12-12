"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerApply {
}
exports.CustomerApply = CustomerApply;
function default_1(sequelize, dataTypes) {
    return sequelize.define('CustomerApply', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        leader: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        phone: {
            type: dataTypes.STRING(30)
        },
        bankCardNo: {
            type: dataTypes.STRING(30)
        },
        idCard: {
            type: dataTypes.STRING(30)
        },
        guideCardNo: {
            type: dataTypes.STRING(30)
        },
        sexes: {
            type: dataTypes.STRING(2),
            defaultValue: '男'
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
        issuingAuthority: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        validPeriod: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        email: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        address: {
            type: dataTypes.STRING(255)
        },
        openId: {
            type: dataTypes.STRING(50)
        },
        state: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        auditor: {
            type: dataTypes.INTEGER
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
