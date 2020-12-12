"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Merchant {
}
exports.Merchant = Merchant;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Merchant', {
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
        emblem: {
            type: dataTypes.STRING(512),
            allowNull: true
        },
        address: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        tel: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        fax: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        website: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        englishName: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        wechat: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        contact: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        businessLicense: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        artificialPerson: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        bankAccount: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        bankBranch: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        bankProvince: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        bankCity: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        taxNumber: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        assignAmount: {
            type: dataTypes.FLOAT,
            allowNull: true
        },
        accountAmount: {
            type: dataTypes.FLOAT,
            allowNull: true
        },
        accountPwd: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        loginPwd: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        loginType: {
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
                name: 'UK_Merchant_Code',
                fields: ['code']
            },
            {
                unique: true,
                name: 'UK_Merchant_Name',
                fields: ['name']
            }
        ],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
