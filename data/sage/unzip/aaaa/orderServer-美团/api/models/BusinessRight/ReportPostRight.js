"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportPostRight {
}
exports.ReportPostRight = ReportPostRight;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ReportPostRight', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        postId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessPriceId: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
