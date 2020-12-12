"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Guide {
}
exports.Guide = Guide;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Guide', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        regionalId: {
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
        passWord: {
            type: dataTypes.STRING(30)
        },
        guideCardNo: {
            type: dataTypes.STRING(50)
        },
        idCard: {
            type: dataTypes.STRING(30)
        },
        bankCardNo: {
            type: dataTypes.STRING(50)
        },
        phone: {
            type: dataTypes.STRING(20)
        },
        address: {
            type: dataTypes.STRING(200)
        },
        totalTimes: {
            type: dataTypes.INTEGER
        },
        lastVisitDate: {
            type: dataTypes.DATE,
            defaultValue: new Date()
        },
        lastIntegralDate: {
            type: dataTypes.DATE,
            defaultValue: new Date()
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
