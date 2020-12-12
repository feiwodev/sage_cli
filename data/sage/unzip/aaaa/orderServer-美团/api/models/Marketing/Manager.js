"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Manager {
}
exports.Manager = Manager;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Manager', {
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
        customerId: {
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
        bankCardNo: {
            type: dataTypes.STRING(50)
        },
        idCard: {
            type: dataTypes.STRING(30)
        },
        phone: {
            type: dataTypes.STRING(50)
        },
        address: {
            type: dataTypes.STRING(200)
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
        isUse: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
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
