"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
}
exports.Card = Card;
function default_1(sequelize, dataTypes) {
    return sequelize.define('Card', {
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
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        isRecharge: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        isPay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        useLimit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        mediaType: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        cardNumber: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        sellWay: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        passConfirm: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        hasIdCard: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        isPrint: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        identifyRegister: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        identifyNumber: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        identifyStorage: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        verifyIdentify: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        imageScores: {
            type: dataTypes.INTEGER
        },
        featurePoints: {
            type: dataTypes.INTEGER
        },
        encrollScores: {
            type: dataTypes.INTEGER
        },
        verifyScores: {
            type: dataTypes.INTEGER
        },
        isAccess: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        deductWay: {
            type: dataTypes.INTEGER,
            defaultValue: 1
        },
        totalNumber: {
            type: dataTypes.INTEGER
        },
        activation: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        activeNum: {
            type: dataTypes.INTEGER
        },
        activeUnits: {
            type: dataTypes.INTEGER,
            defaultValue: 2
        },
        validityNum: {
            type: dataTypes.INTEGER
        },
        validityUnits: {
            type: dataTypes.INTEGER,
            defaultValue: 2
        },
        deposit: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        depositAmount: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        depositNumber: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        purchaseAmount: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        isRefundBalance: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        isPassword: {
            type: dataTypes.BOOLEAN,
            defaultValue: 0
        },
        isInit: {
            type: dataTypes.INTEGER,
            defaultValue: 0
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
