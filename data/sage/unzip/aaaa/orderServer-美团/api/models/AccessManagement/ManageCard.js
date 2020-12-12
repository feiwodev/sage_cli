"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ManageCard {
}
exports.ManageCard = ManageCard;
function default_1(sequelize, dataTypes) {
    return sequelize.define('ManageCard', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        departmentId: {
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
