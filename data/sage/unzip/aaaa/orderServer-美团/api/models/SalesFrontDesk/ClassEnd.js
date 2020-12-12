"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassEnd {
}
exports.ClassEnd = ClassEnd;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ClassEnd', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: dataTypes.STRING(30)
        },
        areaId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesSiteId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        salesWinId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: dataTypes.FLOAT
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        maker: {
            type: dataTypes.INTEGER
        },
        auditor: {
            type: dataTypes.INTEGER
        },
        daily: {
            type: dataTypes.INTEGER
        },
        monthly: {
            type: dataTypes.INTEGER
        },
        annual: {
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
