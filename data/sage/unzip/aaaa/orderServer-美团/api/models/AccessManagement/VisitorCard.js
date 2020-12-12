"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VisitorCard {
}
exports.VisitorCard = VisitorCard;
function default_1(sequelize, dataTypes) {
    return sequelize.define('VisitorCard', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        visitorId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        issuedCardId: {
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
