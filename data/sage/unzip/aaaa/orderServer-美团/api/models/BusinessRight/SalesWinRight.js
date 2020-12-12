"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesWinRight {
}
exports.SalesWinRight = SalesWinRight;
function default_1(sequelize, dataTypes) {
    return sequelize.define('SalesWinRight', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salesWinId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessPriceId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
