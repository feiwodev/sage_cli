"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResidentCard {
}
exports.ResidentCard = ResidentCard;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ResidentCard', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        residentId: {
            type: dataTypes.INTEGER
        },
        issuedCardId: {
            type: dataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => { }
        }
    });
}
exports.default = default_1;
