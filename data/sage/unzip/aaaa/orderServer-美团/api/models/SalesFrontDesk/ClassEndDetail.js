"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassEndDetail {
}
exports.ClassEndDetail = ClassEndDetail;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ClassEndDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classEndId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        carryQuantity: {
            type: dataTypes.INTEGER
        },
        useQuantity: {
            type: dataTypes.INTEGER
        },
        refundQuantity: {
            type: dataTypes.INTEGER
        },
        soldQuantity: {
            type: dataTypes.INTEGER
        },
        balanceQuantity: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
