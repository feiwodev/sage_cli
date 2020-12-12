"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
}
exports.Customer = Customer;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Customer', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        parentId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        level: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        levelSeqNo: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        isLeaf: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        levelTree: {
            type: dataTypes.STRING(1024),
            allowNull: true
        },
        businessId: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        customerCategoryId: {
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
        spellCode: {
            type: dataTypes.STRING(30)
        },
        regionalId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(20),
            defaultValue: 'asd123456'
        },
        loginType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        guaranteeAmount: {
            type: dataTypes.FLOAT
        },
        bookAmount: {
            type: dataTypes.FLOAT
        },
        creditAmount: {
            type: dataTypes.FLOAT
        },
        bookNumber: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        signingDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        isSignContract: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        limitBuyNum: {
            type: dataTypes.INTEGER
        },
        totalTimes: {
            type: dataTypes.INTEGER
        },
        lastVisitDate: {
            type: dataTypes.DATE,
            defaultValue: new Date(0)
        },
        totalIntegral: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        totalAssets: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        averageDaily: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        rankRulesId: {
            type: dataTypes.INTEGER
        },
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        memo: {
            type: dataTypes.STRING(512),
            allowNull: true
        }
    }, {
        indexes: [{
                unique: true,
                name: 'UK_Customer_Code',
                fields: ['code']
            }],
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
