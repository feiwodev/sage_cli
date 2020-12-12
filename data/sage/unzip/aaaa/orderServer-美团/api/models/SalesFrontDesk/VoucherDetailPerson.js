"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoucherDetailPerson {
}
exports.VoucherDetailPerson = VoucherDetailPerson;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VoucherDetailPerson', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherDetailId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        regionalId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        name: {
            type: dataTypes.STRING(20)
        },
        sexes: {
            type: dataTypes.STRING(2),
            defaultValue: '男'
        },
        idCard: {
            type: dataTypes.STRING(20)
        },
        uniqueId: {
            type: dataTypes.STRING(50)
        },
        ticketNo: {
            type: dataTypes.STRING(50)
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
            type: dataTypes.STRING(200)
        },
        issuingAuthority: {
            type: dataTypes.STRING(50)
        },
        validPeriod: {
            type: dataTypes.STRING(50)
        },
        openId: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        phone: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        age: {
            type: dataTypes.INTEGER
        },
        crowdKindId: {
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
